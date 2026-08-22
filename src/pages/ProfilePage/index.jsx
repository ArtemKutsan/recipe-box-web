import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '@/entities/auth';
import { useGetFavoriteRecipesQuery } from '@/entities/favorite';
import { RecipeList } from '@/entities/recipe/ui';
import { UserAvatar, useUpdateMyAvatarMutation, useUser, useUserRecipes } from '@/entities/user';
import {
  MEDIA_UPLOADS_ENABLED,
  uploadUserAvatar,
  useCreatePresignedUploadMutation,
} from '@/entities/media';
import { FavoriteButton } from '@/features/toggle-favorite';
import { Pagination, ToggleGroup } from '@/shared/ui';
import CameraIcon from '@/assets/icons/camera.svg?react';

const PROFILE_RECIPES_PAGE_SIZE = 12;
const AUTHORED_RECIPES = 'authored';
const SAVED_RECIPES = 'saved';
const PROFILE_RECIPE_COLLECTIONS = [
  { value: AUTHORED_RECIPES, label: 'My Recipes' },
  { value: SAVED_RECIPES, label: 'Saved Recipes' },
];

const ProfilePage = () => {
  const { id } = useParams();
  const [activeRecipeCollection, setActiveRecipeCollection] = useState(AUTHORED_RECIPES);
  const [authoredPage, setAuthoredPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);
  const [avatarError, setAvatarError] = useState(null);
  const avatarInputRef = useRef(null);
  const [createPresignedUpload, { isLoading: isPreparingAvatarUpload }] =
    useCreatePresignedUploadMutation();
  const [updateMyAvatar, { isLoading: isSavingAvatar }] = useUpdateMyAvatarMutation();
  const authUser = useSelector(selectAuthUser);
  const isCurrentUserProfile = !id;
  const isSavedRecipesActive = isCurrentUserProfile && activeRecipeCollection === SAVED_RECIPES;
  const userId = id ?? authUser?.id;
  const {
    user: publicUser,
    status: publicUserStatus,
    error: publicUserError,
  } = useUser(userId, {
    skip: isCurrentUserProfile || !userId,
  });
  const user = isCurrentUserProfile ? authUser : publicUser;
  const status = isCurrentUserProfile ? 'succeeded' : publicUserStatus;
  const error = isCurrentUserProfile ? null : publicUserError;
  const {
    recipes,
    total,
    totalPages,
    status: recipesStatus,
    error: recipesError,
  } = useUserRecipes(
    userId,
    {
      page: authoredPage,
      pageSize: PROFILE_RECIPES_PAGE_SIZE,
    },
    {
      skip: !userId,
      isCurrentUser: isCurrentUserProfile,
    },
  );
  const {
    data: savedRecipesData,
    isLoading: areSavedRecipesLoading,
    isError: isSavedRecipesError,
    error: savedRecipesError,
  } = useGetFavoriteRecipesQuery(
    {
      page: savedPage,
      pageSize: PROFILE_RECIPES_PAGE_SIZE,
    },
    {
      skip: !isSavedRecipesActive,
    },
  );

  if (isCurrentUserProfile && !authUser) {
    return <p>Please log in to view your profile.</p>;
  }

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found.</p>;

  const displayName = user.name ?? 'RecipeBox user';
  const profileBio = user.bio || 'This cook has not added a profile bio yet.';
  const profileDetails = [
    { label: 'Age', value: user.age ?? '—' },
    { label: 'Gender', value: user.gender || '—' },
    { label: 'Phone', value: user.phone || '—' },
  ];
  const displayedRecipes = isSavedRecipesActive ? (savedRecipesData?.items ?? []) : recipes;
  const displayedTotal = isSavedRecipesActive ? (savedRecipesData?.total ?? 0) : total;
  const displayedTotalPages = isSavedRecipesActive
    ? (savedRecipesData?.totalPages ?? 0)
    : totalPages;
  const displayedPage = isSavedRecipesActive ? savedPage : authoredPage;
  const displayedStatus = isSavedRecipesActive
    ? areSavedRecipesLoading
      ? 'loading'
      : isSavedRecipesError
        ? 'failed'
        : 'succeeded'
    : recipesStatus;
  const displayedError = isSavedRecipesActive
    ? (savedRecipesError?.data?.error?.message ?? savedRecipesError?.message ?? null)
    : recipesError;

  const changeRecipeCollection = (collection) => {
    setActiveRecipeCollection(collection);

    if (collection === SAVED_RECIPES) {
      setSavedPage(1);
    }
  };

  const changeDisplayedPage = (page) => {
    if (isSavedRecipesActive) {
      setSavedPage(page);
      return;
    }

    setAuthoredPage(page);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    setAvatarError(null);

    try {
      const avatarKey = await uploadUserAvatar(file, createPresignedUpload);
      await updateMyAvatar(avatarKey).unwrap();
    } catch (error) {
      setAvatarError(error?.data?.error?.message ?? error?.message ?? 'Failed to update avatar.');
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p>{isCurrentUserProfile ? 'Your RecipeBox account' : 'Public RecipeBox profile'}</p>
      </header>

      <div className="flex items-center gap-6 rounded-2xl border p-6">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="relative">
            <UserAvatar src={user.avatarUrl} alt={displayName} className="size-24" />
            {isCurrentUserProfile && MEDIA_UPLOADS_ENABLED ? (
              <div className="absolute bottom-0 right-0 rounded-full bg-card shadow-md">
                <button
                  type="button"
                  aria-label="Change avatar"
                  title="Change avatar"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isPreparingAvatarUpload || isSavingAvatar}
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <CameraIcon className="size-4" aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
          {isCurrentUserProfile ? (
            <>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={!MEDIA_UPLOADS_ENABLED}
                onChange={handleAvatarChange}
              />
              {avatarError ? (
                <p className="max-w-32 text-center text-xs text-destructive">{avatarError}</p>
              ) : null}
            </>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">{displayName}</h2>
            <span className="text-sm text-muted-foreground">User #{user.id}</span>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{profileBio}</p>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Recipes</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">{total}</div>
        </div>

        {profileDetails.map((detail) => (
          <div key={detail.label} className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">{detail.label}</div>
            <div className="mt-2 text-sm font-medium">{detail.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border p-4">
        <div className="text-sm text-muted-foreground">Profile</div>
        <p className="mt-2 text-sm leading-6">
          {isCurrentUserProfile
            ? 'This is your RecipeBox profile.'
            : `${displayName} shares recipes on RecipeBox.`}
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">
              {isSavedRecipesActive
                ? 'Saved Recipes'
                : isCurrentUserProfile
                  ? 'My Recipes'
                  : `Recipes by ${displayName}`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {displayedTotal} {displayedTotal === 1 ? 'recipe' : 'recipes'}
            </p>
          </div>

          {isCurrentUserProfile ? (
            <ToggleGroup
              options={PROFILE_RECIPE_COLLECTIONS}
              value={activeRecipeCollection}
              onChange={changeRecipeCollection}
              ariaLabel="Profile recipe collections"
              className="self-start"
            />
          ) : null}
        </div>

        {displayedStatus === 'idle' || displayedStatus === 'loading' ? (
          <p className="text-sm text-muted-foreground">Loading recipes...</p>
        ) : displayedError ? (
          <p className="text-sm text-muted-foreground">{displayedError}</p>
        ) : displayedRecipes.length > 0 ? (
          <RecipeList
            recipes={displayedRecipes}
            renderFavoriteAction={(recipe) => <FavoriteButton recipeId={recipe.id} />}
          />
        ) : (
          <div className="rounded-2xl border border-dashed bg-card p-6 text-sm text-muted-foreground">
            {isSavedRecipesActive ? 'No saved recipes yet.' : 'No recipes published yet.'}
          </div>
        )}

        <Pagination
          page={displayedPage}
          totalPages={displayedTotalPages}
          onPageChange={changeDisplayedPage}
        />
      </section>
    </section>
  );
};

export default ProfilePage;
