import React from 'react';
import { colors, Link, Spacing, Text } from 'react-elemental';
import Logo from 'app/react/components/logo';

/**
 * Error boundary component, displayed when the application encounters a fatal uncaught exception.
 */
const Error = () => (
  <div
    style={{
      alignItems: 'center',
      backgroundColor: colors.gray90,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      width: '100%',
    }}
  >
    <div style={{ width: '500px' }}>
      <Spacing size="huge" bottom>
        <Logo
          color={colors.gray20}
          style={{ width: '150px' }}
        />
      </Spacing>

      <Spacing bottom>
        <Text color={colors.gray10} bold>
          Orion encountered a fatal client-side error.
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Text color={colors.gray20}>
          An error report has already been automatically generated and sent.
        </Text>
      </Spacing>

      <Text color={colors.gray20}>
        However, please also&nbsp;
        <Text color={colors.primary} inline>
          <Link href="https://github.com/LINKIWI/orion-web/issues" activeColor={colors.gray60}>
            file an issue on Github
          </Link>
        </Text>
        &nbsp;with more details about the problem, so that it’s easier for me to fix.
      </Text>
    </div>
  </div>
);

export default Error;
