export const css = `
  button {
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: campton, sans-serif;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    overflow: visible;
  }

  button.magic img {
    filter: brightness(0) invert(1);
  }

  button.regular, button.magic, button.flat, button.flat-magic {
    position: relative;
    border-radius: 23px;
    padding: 12px 24px;
    gap: 10px;
    height: 2.8rem;
  }

  button.regular {
    backdrop-filter: blur(64px);
    color: var(--md);
    background: linear-gradient(90.06deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: 0px 4px 36px rgba(0, 0, 0, 0.25), inset 0px 1px 2px #FFFFFF, inset 0px -1px 2px rgba(0, 0, 0, 0.25);
  }

  button.flat-magic, button.magic-flat-half {
    background: linear-gradient(90deg, rgba(255, 0, 204, 0.20) 0%, rgba(0, 128, 255, 0.20) 100%);
  }

  button.flat, button.half, button.flat-magic, button.magic-flat-half {
    color: var(--dk);
  }

  button.flat, button.half {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 100.31%);

  }

  button.half, button.magic-flat-half {
    border-radius: 23px;
    padding: 1px 24px;
    height: 1.35rem;
  }

  button.magic:before {
    content: " ";
    width: 110%;
    height: 110%;
    position: absolute;
    top: -5%;
    left: -5%;
    z-index: -1;
    border-radius: 23px;
    background: linear-gradient(90deg, #F0C 0%, #0080FF 100%);
    filter: blur(12px);
  }

  button.magic:after {
    content: " ";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    mix-blend-mode: hard-light;
    border-radius: 23px;
    box-shadow: 0px 4px 36px rgba(0, 0, 0, 0.25), inset 0px 1px 2px #FFFFFF, inset 0px -1px 2px rgba(0, 0, 0, 0.25);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.25) 100.31%);
    backdrop-filter: blur(64px);
  }

  button:not(.magic):hover {
    filter:brightness(1.1);
  }

  button.magic:hover {
    box-shadow: inset 0px 0px 24px #FFFFFF55;
  }

  button.flat-magic:hover,
  button.magic-flat-half:hover {
    filter:brightness(1.75);
  }

  button.flat:hover,
  button.half:hover {
    filter:brightness(2.5);
  }
`