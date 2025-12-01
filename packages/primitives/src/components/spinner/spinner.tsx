import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ds-spinner',
  styleUrl: 'spinner.css',
  shadow: true,
})
export class Spinner {
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  render() {
    return (
      <div class={`spinner spinner-${this.size}`} aria-label="Loading">
        <div class="spinner-circle"></div>
      </div>
    );
  }
}

