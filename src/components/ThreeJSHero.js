import React, {useEffect, useRef, useState} from 'react'

import {Canvas, extend, useFrame} from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from "../assets/fonts/gentilis_bold.typeface.json"


import {FontLoader} from "three/examples/jsm/loaders/FontLoader";

extend({ TextGeometry })



const ThreeJSHero = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    const [grpIcosahedronGeometry, setGrpIcosahedronGeometry] = useState([])
    const [grpOctahedronGeometry, setGrpOctahedronGeometry] = useState([])
    const [grpTetrahedronGeometry, setGrpTetrahedronGeometry] = useState([])


    const handleResize = () => {
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
        console.log(-2*screenWidth*0.001)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        let initiateIco = []
        let initiateOcta = []
        let initiateTetra = []
        for (let j = 0; j < 25; j++) {

            initiateIco.push(createElement());
            initiateOcta.push(createElement());
            initiateTetra.push(createElement());
            setGrpIcosahedronGeometry(initiateIco)
            setGrpOctahedronGeometry(initiateOcta)
            setGrpTetrahedronGeometry(initiateTetra)

        }

    }, []);



//---------- Text 3D
    const font = new FontLoader().parse(myFont);


    const bevelSize = 0.02;
    const bevelThickness = 0.03;

    const options = {
        font,
        size:0.1*screenWidth/100,
        height:0.05 * screenHeight/50,
        curveSegments:6,
        bevelEnabled: true,
        bevelThickness:bevelThickness,
        bevelSize:bevelSize,
        bevelOffset:0,
        bevelSegments:3
    };

    const readMesh = React.useRef();
    const writeMesh = React.useRef();
    const earnMesh = React.useRef();

    //---------------- 3D Other elements

    function createElement() {
        return{
            position: {
                    x:(-Math.random() + 0.3)*25,
                    y:(Math.random() - 0.5)*25 ,
                    z:(-Math.random() - 0.2)*25
                },
            rotation: {
                x:(2* Math.PI * Math.random()),
                y:(2* Math.PI * Math.random()),
                z:(2* Math.PI * Math.random())
            }
            }
    }


        //--------------------


    function IcosahedronGeometry(props) {

        const meshRef = useRef("ico" + Math.random())

        useFrame(() => {
            if(!meshRef.current) {
                return
            }

            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01

        })

        return (
            <mesh ref={meshRef}
                position={[props.element.position.x,props.element.position.y,props.element.position.z]}
                rotation={[props.element.rotation.x,props.element.rotation.y,props.element.rotation.z]}

            >
                <icosahedronGeometry/>
                <meshStandardMaterial color={'#989898'} />
            </mesh>
        )
    }

    function OctahedronGeometry(props) {

        const meshRef = useRef("octa" + Math.random())

        useFrame(() => {
            if(!meshRef.current) {
                return
            }

            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01

        })
        return (
            <mesh ref={meshRef}
                position={[props.element.position.x,props.element.position.y,props.element.position.z]}
                rotation={[props.element.rotation.x,props.element.rotation.y,props.element.rotation.z]}

            >
                <octahedronGeometry/>
                <meshStandardMaterial color={'#1F6935'} />
            </mesh>
        )
    }

    function TetrahedronGeometry(props) {


        const meshRef = useRef("ico" + Math.random())

        useFrame(() => {
            if(!meshRef.current) {
                return
            }

            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01

        })

        return (
            <mesh ref={meshRef}
                position={[props.element.position.x,props.element.position.y,props.element.position.z]}
                rotation={[props.element.rotation.x,props.element.rotation.y,props.element.rotation.z]}

            >
                <tetrahedronGeometry/>
                <meshStandardMaterial color={'#00A632'} />
            </mesh>
        )
    }



    return (
            <Canvas className={"position-relative"} style={{"width":"100%", "height":"100vh", 'backgroundColor':"black", "overflow":"hidden !important"}}>
                <ambientLight intensity={0.3} />
                <color attach="background" args={["black"]} />

                <directionalLight color="white" position={[0, 0, 5]} />
                <directionalLight color="white" position={[0, 0, -5]} />


                <mesh ref={readMesh} position={[-3+(screenWidth*0.00000000000001),1.5,0]} rotation={[0,0,0]}>
                    <textGeometry args={['Read', options]}/>
                    <meshStandardMaterial color={'#00A632'} />
                </mesh>


                <mesh ref={writeMesh} position={[-3+(screenWidth*0.0000000000001),0,0]}>
                    <textGeometry args={['Write', options]}/>
                    <meshStandardMaterial color={'#989898'} />
                </mesh>


                <mesh ref={earnMesh} position={[-3+(screenWidth*0.00000000000001),-1.5,0]}>
                    <textGeometry args={['Earn', options]}/>
                    <meshStandardMaterial color={'#1F6935'} />
                </mesh>

                {grpIcosahedronGeometry.map(element => {
                   return (
                       <IcosahedronGeometry key={element.position.x} element={element} />
                    )
                })}

                {grpOctahedronGeometry.map(element => {
                    return (
                        <OctahedronGeometry key={element.position.x} element={element} />
                    )
                })}

                {grpTetrahedronGeometry.map(element => {
                    return (
                        <TetrahedronGeometry key={element.position.x} element={element} />
                    )
                })}

            </Canvas>
    )
}

export default ThreeJSHero
