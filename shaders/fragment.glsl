uniform sampler2D globeTexture;
varying vec3 vertexNormal;
varying vec2 vertexUV;// [0, 0.24]

void main(){
    // To introduce a glow of a specific color to eachh pixel
    float intensity=1.05-dot(vertexNormal,vec3(0.2,0.2,1));
    vec3 atmosphere=vec3(1.0,1.0,1.0)*pow(intensity,1.5);

    gl_FragColor=vec4(atmosphere+texture2D(globeTexture,vertexUV).xyz,1.0);
}