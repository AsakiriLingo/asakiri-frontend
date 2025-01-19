import { Meta, StoryObj } from '@storybook/react';

import { KofiWidget } from './kofi-widget';

const meta: Meta<typeof KofiWidget> = {
  component: KofiWidget,
};

export default meta;

type Story = StoryObj<typeof KofiWidget>;

export const Default: Story = {
  args: {},
};
