import { Meta, StoryObj } from '@storybook/react';

import { CourseSidebar } from './course-sidebar';

const meta: Meta<typeof CourseSidebar> = {
  component: CourseSidebar,
};

export default meta;

type Story = StoryObj<typeof CourseSidebar>;

export const Default: Story = {
  args: {},
};
