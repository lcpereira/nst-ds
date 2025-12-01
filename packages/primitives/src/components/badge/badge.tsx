import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ds-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class Badge {
  @Prop() variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'default';
  @Prop() size: 'sm' | 'md' = 'md';

  render() {
    return (
      <span class={`badge badge-${this.variant} badge-${this.size}`}>
        <slot></slot>
      </span>
    );
  }
}

