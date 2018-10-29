import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'me-button',
  styleUrl: 'me-button.css',
  shadow: true
})
export class MeButton {
  @Prop() direction: string = 'tb';

  @Element() rootEl: HTMLElement;

  private slide_direction: string = 'tb';

  componentWillLoad() {
    //this.rootEl.style.setProperty('--me-button-width', (this.width) ? this.width: '100px');
    this.slide_direction = 'slide slide_tb';
    if (['tb', 'bt', 'lr', 'rl'].includes(this.direction)) this.slide_direction = `slide slide_${this.direction}`;
  }

  slide(): void {
    alert('riri')
  }

  render() {
    return (<div class="root">
              <button class="text"><slot/></button>
              <div class={this.slide_direction}></div>
            </div>);
  }
}
