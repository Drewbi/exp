import { PerspectiveCamera, WebGLRenderer } from "three";

export const resizeRendererToDisplaySize = (renderer: WebGLRenderer, camera?: PerspectiveCamera) => () => {
    const container = document.getElementById('container')
    if (container) {
        const width = container.clientWidth
        const height = container.clientHeight

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
