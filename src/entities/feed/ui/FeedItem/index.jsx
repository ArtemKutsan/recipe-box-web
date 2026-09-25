import { PostCard } from '@/entities/post';
import FeedRecipeItem from '../FeedRecipeItem';

const FeedItem = ({ item }) => {
  if (item.type === 'post') {
    return <PostCard post={item.post} compact />;
  }

  return <FeedRecipeItem recipe={item.recipe} publishedAt={item.publishedAt} />;
};

export default FeedItem;
