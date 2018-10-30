import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'ccn-button-slide',
  styleUrl: 'ccn-button-slide.css',
  shadow: true
})
export class CcnButtonSlide {
  @Prop() direction: string = 'tb';

  @Element() rootEl: HTMLElement;

  private slide_direction: string = 'tb';

  componentWillLoad() {
    //this.rootEl.style.setProperty('--me-button-width', (this.width) ? this.width: '100px');
    this.slide_direction = 'slide_tb';
    if (['tb', 'bt', 'lr', 'rl'].includes(this.direction)) this.slide_direction = `slide_${this.direction}`;
  }

  slide(): void {
    alert('riri')
  }

  render() {
    return (<div class="root">
              <button class="text"><slot/></button>
              <div class={'slide ' + this.slide_direction}></div>
              <div class={'slide2 ' + this.slide_direction}></div>
            </div>);
  }
}
