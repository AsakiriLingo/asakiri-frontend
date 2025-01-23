import { Meta, StoryObj } from '@storybook/react';

import { CourseLearningCard } from './course-learning-card';

const meta: Meta<typeof CourseLearningCard> = {
  component: CourseLearningCard,
};

export default meta;

type Story = StoryObj<typeof CourseLearningCard>;

export const Default: Story = {
  args: {},
};
