import { PerspectiveCamera, WebGLRenderer } from "three";

export const resizeRendererToDisplaySize = (renderer: WebGLRenderer, camera?: PerspectiveCamera) => () => {
    const canvas = document.getElementsByTagName('canvas')[0]
    if (canvas) {
        console.log('test')
        const width = canvas.clientWidth
        const height = canvas.clientHeight

        renderer.setSize(width, height, false);

        if (camera) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }
}

export function replaceAllChildren(element: HTMLElement, newChild: HTMLElement) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    element.appendChild(newChild)
}
