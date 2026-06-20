# RecipeBox Web

Frontend SPA для просмотра рецептов, страницы деталей, создания рецептов, профилей пользователей и недельного планирования питания.

## Стек

- React 19
- Vite 8
- React Router DOM 7
- Redux Toolkit и React Redux
- React Hook Form
- Axios
- Tailwind CSS 4
- SVGR
- `clsx` и `tailwind-merge`

Данные рецептов и пользователей сейчас загружаются из DummyJSON как временного frontend API provider.

## Скрипты

Установка зависимостей:

```bash
npm install
```

Запуск dev-сервера:

```bash
npm run dev
```

Проверки и production build:

```bash
npm run lint
npm run build
npm run preview
```

## Маршруты

| Путь            | Страница                       |
| --------------- | ------------------------------ |
| `/`             | `MainPage`                     |
| `/recipes`      | `RecipesPage`                  |
| `/recipes/:id`  | `RecipeDetailsPage`            |
| `/categories`   | `CategoriesPage`               |
| `/add-recipe`   | `AddRecipePage`                |
| `/meal-planner` | `MealPlannerPage`              |
| `/profile`      | `ProfilePage`                  |
| `/users/:id`    | публичный профиль пользователя |
| `*`             | `NotFoundPage`                 |

## Архитектура

Приложение следует границам Feature-Sliced Design:

```text
src/
├── app/        # shell приложения, providers, store, router, global styles
├── pages/      # страницы маршрутов
├── widgets/    # крупные переиспользуемые блоки приложения
├── features/   # пользовательские сценарии
├── entities/   # бизнес-сущности
├── shared/     # переиспользуемые UI, config, hooks, utilities
└── assets/     # изображения и SVG-иконки
```

Направление зависимостей:

```text
app -> pages -> widgets/features -> entities -> shared
```

Нижние слои не должны импортировать верхние. Внешние потребители должны импортировать entities и features через их публичные API.

## Frontend State

Redux state сейчас включает:

```js
{
  recipes,
  users,
  addRecipe,
  mealPlan,
}
```

- `entities/recipe` отвечает за загрузку рецептов, API-вызовы рецептов, селекторы, list UI и derived recipe helpers.
- `entities/user` отвечает за нормализованную загрузку пользователей и cached user state.
- `features/add-recipe` отвечает за состояние формы создания рецепта.
- `features/meal-planner` отвечает за state недельного плана питания и planner UI.

Слоты Meal Planner хранят ID рецептов или `null`, а не дублированные объекты рецептов.

## Текущие ограничения frontend

- DummyJSON не сохраняет созданные рецепты.
- Изменения Meal Planner хранятся только в Redux state текущей browser-сессии.
- Некоторые social sections профиля являются placeholders и не показывают fake social data.
