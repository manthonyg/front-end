import React from 'react';
import classNames from 'classnames';
import { string, node, bool, oneOf } from 'prop-types';
import Link from 'next/link';
import OutboundLink from 'components/OutboundLink/OutboundLink';
import styles from 'components/Button/Button.module.css';

LinkButton.propTypes = {
  // Only pass analytics event label if you're href is to an external website
  analyticsEventLabel: string,
  children: node.isRequired,
  className: string,
  'data-testid': string,
  fullWidth: bool,
  href: string.isRequired,
  shouldPrefetch: bool,
  theme: oneOf(['primary', 'secondary']),
};

LinkButton.defaultProps = {
  analyticsEventLabel: '',
  className: undefined,
  'data-testid': undefined,
  fullWidth: false,
  shouldPrefetch: false,
  theme: 'primary',
};

export default function LinkButton({
  analyticsEventLabel,
  children,
  className,
  'data-testid': testID,
  fullWidth,
  href,
  shouldPrefetch,
  theme,
}) {
  const linkButtonClassNames = classNames(styles.Button, className, styles[theme], {
    [styles.fullWidth]: fullWidth,
  });

  const hasAnalyticsEventLabel = !!analyticsEventLabel;

  return hasAnalyticsEventLabel ? (
    <OutboundLink
      analyticsEventLabel={analyticsEventLabel}
      className={linkButtonClassNames}
      data-testid={testID}
      hasIcon={false}
      href={href}
    >
      {children}
    </OutboundLink>
  ) : (
    <Link href={href} prefetch={shouldPrefetch}>
      <a className={linkButtonClassNames} data-testid={testID} href={href}>
        {children}
      </a>
    </Link>
  );
}
