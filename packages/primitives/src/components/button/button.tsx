import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ds-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class Button {
  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() disabled: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    return (
      <button
        class={`btn btn-${this.variant} btn-${this.size}`}
        disabled={this.disabled}
        type={this.type}
      >
        <slot></slot>
      </button>
    );
  }
}

