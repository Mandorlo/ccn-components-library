/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface CcnButtonSlide {
    'direction': string;
  }
  interface CcnButtonSlideAttributes extends StencilHTMLAttributes {
    'direction'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'CcnButtonSlide': Components.CcnButtonSlide;
  }

  interface StencilIntrinsicElements {
    'ccn-button-slide': Components.CcnButtonSlideAttributes;
  }


  interface HTMLCcnButtonSlideElement extends Components.CcnButtonSlide, HTMLStencilElement {}
  var HTMLCcnButtonSlideElement: {
    prototype: HTMLCcnButtonSlideElement;
    new (): HTMLCcnButtonSlideElement;
  };

  interface HTMLElementTagNameMap {
    'ccn-button-slide': HTMLCcnButtonSlideElement
  }

  interface ElementTagNameMap {
    'ccn-button-slide': HTMLCcnButtonSlideElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
