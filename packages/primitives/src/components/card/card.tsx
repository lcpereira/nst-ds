import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'nst-card',
  styleUrl: 'card.css',
  shadow: true,
})
export class Card {
  @Prop() padding: 'sm' | 'md' | 'lg' = 'md';

  render() {
    return (
      <div class={`card card-${this.padding}`}>
        <slot></slot>
      </div>
    );
  }
}

