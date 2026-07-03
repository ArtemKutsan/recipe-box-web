import { useParams } from 'react-router-dom';
import { RecipeList } from '@/entities/recipe/ui';
import { useUser, useUserRecipes } from '@/entities/user';
import { DEV_USER_ID } from '@/shared/config/devUser';

const ProfilePage = () => {
  const { id } = useParams();
  const userId = id ?? DEV_USER_ID;
  const { user, status, error } = useUser(userId);
  const { recipes, total, status: recipesStatus, error: recipesError } = useUserRecipes(userId);
  const isCurrentUserProfile = !id;

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found.</p>;

  const profileStats = [
    { label: 'Recipes', value: total },
    { label: 'Favorites', value: 0 },
    { label: 'Comments', value: 0 },
  ];
  const profileDetails = [
    { label: 'Age', value: user.age ?? '—' },
    { label: 'Gender', value: user.gender || '—' },
    { label: 'Contact', value: user.phone || '—' },
    { label: 'Bio', value: user.bio || '—' },
  ];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p>{isCurrentUserProfile ? 'Your RecipeBox account' : 'Public RecipeBox profile'}</p>
      </header>

      <div className="flex items-center gap-6 rounded-2xl border p-6">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className="size-24 rounded-full object-cover" />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-full border bg-muted text-2xl font-semibold">
            {user.name?.slice(0, 1)?.toUpperCase() ?? 'U'}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <span className="text-sm text-muted-foreground">User #{user.id}</span>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-3">
          {profileStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border p-4">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">About</div>
          <p className="mt-2 text-sm leading-6">
            {isCurrentUserProfile
              ? 'This is your RecipeBox profile. Share recipes, save favorites, and join the discussion.'
              : `${user.name} shares recipes on RecipeBox and builds a public profile around their cooking.`}
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {profileDetails.map((detail) => (
          <div key={detail.label} className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">{detail.label}</div>
            <div className="mt-2 text-sm font-medium">{detail.value}</div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">Recipes by {user.name}</h2>
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
