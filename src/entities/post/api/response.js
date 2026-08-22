export function toPostResponse(post) {
  return {
    id: post.id,
    title: post.title ?? '',
    body: post.body ?? '',
    author: post.author ?? null,
    recipe: post.recipe ?? null,
    createdAt: post.createdAt ?? null,
    updatedAt: post.updatedAt ?? null,
  };
}
