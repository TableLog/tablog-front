export {}; // 모듈로 인식되도록 함

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'box-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        onClick?: () => void;
        name?: string;
        type?: 'solid' | 'regular' | 'logo';
        color?: string;
        size?: string;
        animation?:
          | 'spin'
          | 'tada'
          | 'flashing'
          | 'burst'
          | 'fade-left'
          | 'fade-right'
          | 'fade-up'
          | 'fade-down';
        rotate?: '90' | '180' | '270';
        flip?: 'horizontal' | 'vertical';
        pull?: 'left' | 'right';
        class?: string;
      };
    }
  }
}
