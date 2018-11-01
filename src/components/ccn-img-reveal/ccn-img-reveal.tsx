// inspired by https://tympanus.net/Tutorials/3DHoverEffects/index2.html

import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'ccn-img-reveal',
  styleUrl: 'ccn-img-reveal.css',
  shadow: true
})
export class CcnImgReveal {
    @Prop() src: string = '';

    @Prop() width: string = '300px';
    @Prop() height: string = '200px'; // or '200' but should bu always px
    @Prop() fit: string = 'cover';
    
    @Element() private rootEl: HTMLElement;

    async componentDidLoad() {
        let root = this.rootEl.shadowRoot;
        let view_el = root.querySelector('.view') as HTMLElement;
        view_el.style.width = this.width;
        view_el.style.height = this.height;
    
        let slices = root.querySelectorAll('.slice') as NodeListOf<HTMLElement>;
        [].slice.call(slices).map(slice => slice.style.backgroundImage = `url('${this.src}')`);

        // dimensions de l'image originale
        let orig_size = await this.getImgSize(this.src);
        let orig_w = orig_size['width'];
        let orig_h = orig_size['height'];
        let orig_ratio = orig_w / orig_h;
        // dimensions de l'élément HTML root
        let root_w = this.rootEl.offsetWidth; if (root_w == 0) root_w = parseInt(/[0-9]+/g.exec(this.width)[0]);
        let root_h = this.rootEl.offsetHeight; if (root_h == 0) root_h = parseInt(/[0-9]+/g.exec(this.height)[0]);
        let root_ratio = root_w / root_h;
        console.log('img orig size w,h', orig_w, orig_h)
        console.log('root w,h', root_w, root_h)
        
        // ========== COVER ===========
        let img_w; let img_h; let img_x; let img_y;
        if (orig_ratio < root_ratio) { // --> img_w = root_w
            console.log('img_ratio < root_ratio')
            img_w = root_w;
            img_h = Math.round(root_w * orig_h / orig_w);
            img_x = 0;
            img_y = Math.round((img_h - root_h) / 2);
        } else if (orig_ratio > root_ratio) {
            console.log('img_ratio > root_ratio')
            img_w = Math.round(root_h * orig_w / orig_h);
            img_h = root_h;
            img_x = Math.round((img_w - root_w) / 2);
            img_y = 0;
        } else {
            img_w = root_w
            img_h = root_h
            img_x = 0
            img_y = 0
        }
        
        let step = Math.round(root_w / 5);
        console.log('img w,h,x,y,step', img_w, img_h, img_x, img_y, step);
        [].slice.call(slices).map(slice => {
            slice.style.backgroundSize = this.fit; //`${img_w}px ${img_h}px')`;
            slice.style.width = `${step}px`
        });

        let list_el = root.querySelectorAll('.view .s2, .view .s3, .view .s4, .view .s5') as NodeListOf<HTMLElement>;
        [].slice.call(list_el).map((el) => el.style.transform = `translate3d(${step}px, 0, 0)`);
        (root.querySelector('.overlay') as HTMLElement).style.width = step + 'px';
        
        // Mise en place de l'image de fond dans les slices
        [1,2,3,4,5].map(i => {
            let el = root.querySelector('.s' + i) as HTMLElement;
            el.style.backgroundPosition = `${-img_x - (i-1) * step}px ${-img_y}px`;

            let curr_step = (i == 5) ? step: step-1; if (i == 1) curr_step = 5;
            el.style.transform = `translate3d(${curr_step}px, 0, 0)`;
        });

        // Mise en place de la tourne de page on :hover de .view
        (root.querySelector('.view') as HTMLElement).onmouseenter = () => {
            let transitionDelays = [null, '200ms', '150ms', '100ms', '50ms'];
            let angles = [null, -3, -10, -16, -30, -42];
            [1,2,3,4,5].map(i => {
                let curr_el = this.rootEl.shadowRoot.querySelector('.s' + i) as HTMLElement;
                curr_el.style.transitionDelay = transitionDelays[i];
                curr_el.style.transform += ` rotate3d(0,1,0,${angles[i]}deg)`
            })
        }

        // Retour à la normale de page on mouseleave de .view
        (root.querySelector('.view') as HTMLElement).onmouseleave = () => {
            let transitionDelays = [null, '200ms', '150ms', '100ms', '50ms'];
            [1,2,3,4,5].map(i => {
                let curr_el = this.rootEl.shadowRoot.querySelector('.s' + i) as HTMLElement;
                let curr_step = (i == 5) ? step: step-1; if (i == 1) curr_step = 5;
                curr_el.style.transitionDelay = transitionDelays[i];
                curr_el.style.transform = `translate3d(${curr_step}px,0,0) rotate3d(0,1,0,0)`
            })
        }
    }

    render() {
        return (<div id="root" class="view">
                    <div class="view-back">
                        <slot/>
                        {/* <span data-icon="A">566</span>
                        <span data-icon="B">124</span>
                        <a href="http://www.flickr.com/photos/ag2r/5033654303/in/photostream">→</a> */}
                    </div>
        
                    <div class="slice s1">
                        <span class="overlay"></span>
                        <div class="slice s2"><span class="overlay"></span>
                            <div class="slice s3"><span class="overlay"></span>
                                <div class="slice s4"><span class="overlay"></span>
                                    <div class="slice s5"><span class="overlay"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
    }

    async getImgSize(imgSrc) {
        var newImg = new Image();
    
        return new Promise((resolve, _) => {
            newImg.onload = function() {
                var height = newImg.height;
                var width = newImg.width;
                console.log('The image size is '+width+'*'+height);
                resolve({width, height})
            }
          
            newImg.src = imgSrc; // this must be done AFTER setting onload
        })
    }
}
