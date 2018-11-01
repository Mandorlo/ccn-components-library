import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'ccn-bg-video',
  styleUrl: 'ccn-bg-video.css',
  shadow: true
})
export class CcnBgVideo {
    @Prop() video: string = 'http://media.w3.org/2010/05/sintel/trailer.mp4';//'https://www.youtube.com/embed/pyBCgGIKNxQ';
    @Prop() poster: string = '';//'http://www.planetcustodian.com/wp-content/uploads/2015/08/Outward-Bound-by-Marc-Adamus.jpg';
    @Prop() width: string = '200px';
    @Prop() height: string = '100px';

    @Element() rootEl: HTMLElement;

    private youtube: boolean = true;
    private video_url: string = '';
    private player_ratio_class: string = 'same_width';

    componentWillLoad() {
        this.youtube = /^https\:\/\/www\.youtube\.com/g.test(this.video);
        this.video_url = this.video;

        // prepare youtube URL
        if (this.youtube) {
            this.video_url += '?autoplay=1&loop=1&controls=0&showinfo=0&autohide=1';
        }

        this.rootEl.style.setProperty('background-image', `url(${this.poster})`);
    }

    render() {
        return (<div class="root"> 
                    <div class="video_container">
                        {this.youtube
                        ?   <iframe frameborder="0" height="100%" width="100%" src={this.video_url}></iframe>
                        :   <video  id="video" class={'video_player ' + this.player_ratio_class} 
                                    width="100%" height="100%"
                                    preload="none" muted autoplay loop playsinline poster={this.poster}>
                                <source id="mp4" src={this.video_url}/>
                                <p>Your browser does not support HTML5 Video!</p>
                            </video>
                        }
                    </div>
                    <div id="overlay">
                        <slot/>
                    </div>
                </div>);
    }
}