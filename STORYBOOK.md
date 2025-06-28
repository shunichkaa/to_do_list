# Storybook для Todo List приложения

Этот проект использует Storybook для разработки и тестирования компонентов в изоляции.

## Запуск Storybook

```bash
npm run storybook
```

Storybook будет доступен по адресу: http://localhost:6006

## Сборка Storybook

```bash
npm run build-storybook
```

## Структура Stories

### TodoList компоненты

#### TaskItem
- **Default** - обычная задача
- **Completed** - выполненная задача
- **LongTitle** - задача с длинным названием
- **ShortTitle** - задача с коротким названием

#### TodolistItem
- **Default** - стандартный список задач
- **LongTitle** - список с длинным названием
- **ShortTitle** - список с коротким названием
- **WithActiveFilter** - с активным фильтром
- **WithCompletedFilter** - с фильтром выполненных

#### TodolistTitle
- **Default** - стандартный заголовок
- **LongTitle** - длинный заголовок
- **ShortTitle** - короткий заголовок

#### FilterButtons
- **AllFilter** - фильтр "Все"
- **ActiveFilter** - фильтр "Активные"
- **CompletedFilter** - фильтр "Выполненные"

#### Tasks
- **WithTasks** - список с задачами
- **Empty** - пустой список
- **ActiveFilter** - только активные задачи
- **CompletedFilter** - только выполненные задачи

#### Todolists
- **WithTodolists** - несколько списков задач
- **Empty** - пустой список
- **SingleTodolist** - один список задач

### Common компоненты

#### CreateItemForm
- **Default** - стандартная форма
- **WithLongPlaceholder** - форма с длинным placeholder

#### EditableSpan
- **Default** - редактируемый текст
- **ShortText** - короткий текст
- **LongText** - длинный текст
- **EmptyText** - пустой текст
- **WithSpecialCharacters** - текст со специальными символами

#### Button
- **Default** - стандартная кнопка
- **WithChildren** - кнопка с контентом
- **Primary** - основная кнопка
- **Secondary** - вторичная кнопка
- **Outlined** - контурная кнопка
- **Contained** - заполненная кнопка
- **Success** - кнопка успеха
- **Error** - кнопка ошибки

## Особенности

1. **Redux интеграция** - все компоненты, использующие Redux, обернуты в Provider с мок store
2. **Material-UI тема** - настроена тема Material-UI для корректного отображения
3. **Контролы** - добавлены интерактивные контролы для изменения props
4. **Actions** - настроены actions для отслеживания событий
5. **Документация** - автоматическая генерация документации для каждого компонента

## Добавление новых Stories

Для добавления нового story:

1. Создайте файл `ComponentName.stories.tsx` рядом с компонентом
2. Импортируйте компонент и типы
3. Создайте meta объект с настройками
4. Добавьте различные варианты компонента как stories

Пример:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // настройки контролов
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props компонента
  },
};
``` 