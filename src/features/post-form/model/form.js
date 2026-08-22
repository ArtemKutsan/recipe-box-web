export const postFormRules = {
  title: {
    required: 'Title is required.',
    maxLength: {
      value: 160,
      message: 'Title must be no longer than 160 characters.',
    },
  },
  body: {
    required: 'Text is required.',
    maxLength: {
      value: 5000,
      message: 'Text must be no longer than 5000 characters.',
    },
  },
};

export const initialPostFormValues = {
  title: '',
  body: '',
  recipeId: null,
};
