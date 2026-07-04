import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '@/entities/auth';
import { RecipeList } from '@/entities/recipe/ui';
import { useUser, useUserRecipes } from '@/entities/user';

const ProfilePage = () => {
  const { id } = useParams();
  const authUser = useSelector(selectAuthUser);
  const isCurrentUserProfile = !id;
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
  const { recipes, total, status: recipesStatus, error: recipesError } = useUserRecipes(userId, {
    skip: !userId,
  });

  if (isCurrentUserProfile && !authUser) {
    return <p>Please log in to view your profile.</p>;
  }

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found.</p>;

  const displayName = user.name ?? 'RecipeBox user';
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const profileBio = user.bio || 'This cook has not added a profile bio yet.';
  const profileDetails = [
    { label: 'Age', value: user.age ?? '—' },
    { label: 'Gender', value: user.gender || '—' },
    { label: 'Phone', value: user.phone || '—' },
  ];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p>{isCurrentUserProfile ? 'Your RecipeBox account' : 'Public RecipeBox profile'}</p>
      </header>

      <div className="flex items-center gap-6 rounded-2xl border p-6">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={displayName} className="size-24 rounded-full object-cover" />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-full border bg-muted text-2xl font-semibold">
            {avatarLetter}
          </div>
        )}

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
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">Recipes by {displayName}</h2>
            <p className="text-sm text-muted-foreground">
              {total} {total === 1 ? 'recipe' : 'recipes'}
            </p>
          </div>
        </div>

        {recipesStatus === 'idle' || recipesStatus === 'loading' ? (
          <p className="text-sm text-muted-foreground">Loading recipes...</p>
        ) : recipesError ? (
          <p className="text-sm text-muted-foreground">{recipesError}</p>
        ) : recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          <div className="rounded-2xl border border-dashed bg-card p-6 text-sm text-muted-foreground">
            No recipes published yet.
          </div>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
