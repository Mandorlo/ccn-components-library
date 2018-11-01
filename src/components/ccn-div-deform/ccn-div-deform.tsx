import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'ccn-div-deform',
  styleUrl: 'ccn-div-deform.css',
  shadow: true
})
export class CcnDivDeform {
    @Prop() direction: string = 'tb';
    @Element() rootEl: HTMLElement;

    render() {
        return (<div class="root">
                    <slot />
                </div>);
    }
}
