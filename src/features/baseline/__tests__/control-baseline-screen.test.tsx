import { render } from '@testing-library/react-native';

import { ControlBaselineScreen } from '@/features/baseline/control-baseline-screen';

describe('<ControlBaselineScreen />', () => {
  it('presents the CONTROL baseline without starter content', async () => {
    const view = await render(<ControlBaselineScreen />);

    view.getByRole('header', { name: 'CONTROL' });
    view.getByText('Your body changes every day.\nYour plan should too.');
    view.getByText('Foundation ready');
    expect(view.queryByText(/expo starter/i)).toBeNull();
  });
});
