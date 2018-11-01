import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'ccn-bouncing',
  styleUrl: 'ccn-bouncing.css',
  shadow: true
})
export class CcnBouncing {
    @Prop() width: string = '100px';        // largeur de la forme
    @Prop() height: string = '100px';       // hauteur de la forme
    @Prop() bounceLength: string = '45px';  // hauteur du rebond
    @Prop() deformStrength: string = '15%'; // peut être en % ou en px
    
    @Prop() gravity: string = 'b';          // où se situe la gravité (b = bottom, t)
    @Prop() deformPosition: string = 't';   // à quel endroit a lieu la déformation (b, t)
    
    @Prop() trigger: string = 'hover';

    
    @Prop() debug: string = "true";

    @Element() rootEl: HTMLElement;


    componentWillLoad() {
        // on met en place le trigger de l'animation
        if (this.trigger == 'hover') {
            this.rootEl.addEventListener('mouseenter', () => {
                this.rootEl.style.setProperty('--ccn-bounce-count', 'infinite');
            })
            this.rootEl.addEventListener('mouseleave', () => {
                this.rootEl.style.setProperty('--ccn-bounce-count', '0');
            })
        } else {
            this.rootEl.style.setProperty('--ccn-bounce-count', 'infinite');
        }

        // on paramètre le type d'animation selon la gravité et la position où doit avoir lieu la déformation
        this.setAnimationName()

        // we compute height under compression
        let re_h = /^[0-9]+/g.exec(this.height);
        let h = (re_h) ? parseInt(re_h[0]): 100;

        // we compute bounce first stop length
        let re_bl = /^[0-9]+/g.exec(this.bounceLength);
        let bl = (re_bl) ? parseInt(re_bl[0]): 45;

        this.rootEl.style.setProperty('--ccn-width', this.width);
        this.rootEl.style.setProperty('--ccn-height', this.height);
        this.rootEl.style.setProperty('--ccn-bounce-length', (-bl).toString() + 'px');

        let re_deform_val = /^[0-9]+/g.exec(this.deformStrength);
        let re_deform_type = /\%$/g.exec(this.deformStrength);
        let deform_val = (re_deform_val) ? parseFloat(re_deform_val[0]) : 0.15;
        let deform_type = (re_deform_type) ? re_deform_type[0] : '%';
        if (this.debug == 'true') console.log(this.width, this.height, this.bounceLength)

        // we compute width under compression
        let re_w = /^[0-9]+/g.exec(this.width);
        if (re_w) {
            let w = parseInt(re_w[0]);
            let delta = (deform_type == '%') ? deform_val * w / 100: deform_val;
            let widthDeformed = Math.round(w + delta);
            if (this.debug == 'true') console.log('widthDeformed', widthDeformed, delta)
            this.rootEl.style.setProperty('--ccn-width-deformed', widthDeformed + 'px');
        }

        // we compute height under compression            
        let delta = (deform_type == '%') ? deform_val * h / 100: deform_val;
        let heightDeformed = Math.max(0, Math.round(h - delta));
        if (this.debug == 'true') console.log('heightDeformed', heightDeformed, delta)
        this.rootEl.style.setProperty('--ccn-height-deformed', heightDeformed + 'px');
            
        // bounce stop
        let bounceStop = Math.round(0.5 * (bl - h + heightDeformed));
        if (this.debug == 'true') console.log('bounceStop', bounceStop, bl)
        this.rootEl.style.setProperty('--ccn-bounce-first-stop', (-bounceStop).toString() + 'px');
            
        
    }

    render() {
        return (<div class="root deforming">
                    <slot />
                </div>);
    }

    setAnimationName() {
        let gravity = (['b', 't'].includes(this.gravity)) ? this.gravity: 'b';
        let deform_position = (['b', 't'].includes(this.deformPosition)) ? this.deformPosition: 't';
        let anim_name = `bounce_${gravity}_d${deform_position}`;
        this.rootEl.style.setProperty('--ccn-animation-name', anim_name);
    }
}
