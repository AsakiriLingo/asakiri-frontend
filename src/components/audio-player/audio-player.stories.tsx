import { Meta, StoryObj } from '@storybook/react';

import AudioPlayer from '@/components/audio-player/audio-player.tsx';

const meta: Meta<typeof AudioPlayer> = {
  component: AudioPlayer,
};

export default meta;

type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
  args: {},
};
