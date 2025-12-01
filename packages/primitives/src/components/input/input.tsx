import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'ds-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class Input {
  @Prop() type: string = 'text';
  @Prop() placeholder: string = '';
  @Prop() value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() name: string = '';

  @Event() inputChange!: EventEmitter<string>;
  @Event() inputFocus!: EventEmitter<void>;
  @Event() inputBlur!: EventEmitter<void>;

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.inputChange.emit(target.value);
  };

  private handleFocus = () => {
    this.inputFocus.emit();
  };

  private handleBlur = () => {
    this.inputBlur.emit();
  };

  render() {
    return (
      <input
        type={this.type}
        placeholder={this.placeholder}
        value={this.value}
        disabled={this.disabled}
        required={this.required}
        name={this.name}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        class="ds-input"
      />
    );
  }
}

