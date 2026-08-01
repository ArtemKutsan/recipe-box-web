import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '@/entities/auth';
import { useGetFavoriteRecipesQuery } from '@/entities/favorite';
import { RecipeList } from '@/entities/recipe/ui';
import { UserAvatar, useUser, useUserRecipes } from '@/entities/user';
import { FavoriteButton } from '@/features/toggle-favorite';
import { Button, Pagination } from '@/shared/ui';

const PROFILE_RECIPES_PAGE_SIZE = 12;
const AUTHORED_RECIPES = 'authored';
const SAVED_RECIPES = 'saved';

const ProfilePage = () => {
  const { id } = useParams();
  const [activeRecipeCollection, setActiveRecipeCollection] = useState(AUTHORED_RECIPES);
  const [authoredPage, setAuthoredPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);
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

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p>{isCurrentUserProfile ? 'Your RecipeBox account' : 'Public RecipeBox profile'}</p>
      </header>

      <div className="flex items-center gap-6 rounded-2xl border p-6">
        <UserAvatar src={user.avatarUrl} alt={displayName} className="size-24" />

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
            <div
              className="flex self-start rounded-xl border bg-card p-1 gap-1"
              role="tablist"
              aria-label="Profile recipe collections"
            >
              <Button
                size="sm"
                variant={activeRecipeCollection === AUTHORED_RECIPES ? 'secondary' : 'ghost'}
                role="tab"
                aria-selected={activeRecipeCollection === AUTHORED_RECIPES}
                onClick={() => changeRecipeCollection(AUTHORED_RECIPES)}
              >
                My Recipes
              </Button>
              <Button
                size="sm"
                variant={activeRecipeCollection === SAVED_RECIPES ? 'secondary' : 'ghost'}
                role="tab"
                aria-selected={activeRecipeCollection === SAVED_RECIPES}
                onClick={() => changeRecipeCollection(SAVED_RECIPES)}
              >
                Saved Recipes
              </Button>
            </div>
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
