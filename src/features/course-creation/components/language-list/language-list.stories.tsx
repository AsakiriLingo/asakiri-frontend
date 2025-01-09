import { Meta, StoryObj } from '@storybook/react';

import { LanguageList } from './language-list';

const meta: Meta<typeof LanguageList> = {
  component: LanguageList,
};

export default meta;

type Story = StoryObj<typeof LanguageList>;

export const Default: Story = {
  args: {},
};
