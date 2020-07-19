import {html} from '@polymer/lit-element';

export const ShadowStyles = html`
<style>
  .shadow.animated.elevate {
    transition-property: box-shadow;
  }

  .shadow {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }


  .shadow.elevate:hover,
  .shadow.elevated {
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                0  6px 30px 5px rgba(0, 0, 0, 0.12),
                0  8px 10px -5px rgba(0, 0, 0, 0.4);    
  }
</style>
`;

export const AnimatedStyles = html`
<style>
  .animated {
    transition-duration: 0.28s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
`;
