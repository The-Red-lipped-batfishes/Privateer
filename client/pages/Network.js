import Graph from 'react-graph-vis';
import React, { useState, useEffect } from 'react';
import namespaceImg from '../assets/k8_icons/ns-128.png';
import podImg from '../assets/k8_icons/pod-128.png';
import serviceImg from '../assets/k8_icons/svc-128.png';
import ingressImg from '../assets/k8_icons/ing-128.png';
import deploymentImg from '../assets/k8_icons/deploy-128.png';
import NetworkModal from '../components/network/NetworkModal';
import fetchNetworkData from '../util/fetchNetworkData';
import options from '../constants/graphOptions';
import { Container } from '@mui/material';

const MonitorGraph = () => {
  //maps Kubernetes object icons to object kind
  const imgMap = {
    namespace: namespaceImg,
    pod: podImg,
    ingress: ingressImg,
    service: serviceImg,
    deployment: deploymentImg,
  };

  //uses Kubernetes object data to creates vis.js node objects with styling
  const makeNode = (data) => {
    return {
      id: data.uid,
      font: {
        color: 'black',
        size: 22,
        face: 'robato',
        strokeWidth: 3,
        strokeColor: 'white',
      },
      label: data.name.length > 18 ? data.name.slice(0, 20) + '...' : data.name,
      shape: 'image',
      shapeProperties: {
        useImageSize: true,
      },
      shadow: {
        enabled: true,
      },
      image: imgMap[data.kind],
    };
  };

  const [state, setState] = useState({
    graph: {
      nodes: [],
      edges: [],
    },
    nodeData: {},
    events: {
      //if user clicks a node, open modal and store node id and pointer location in state
      click: ({ nodes, pointer: { DOM } }) => {
        if (nodes.length)
          setState((state) => ({
            ...state,
            selectedNode: state.nodeData[nodes[0]],
            pointerLocation: DOM,
            modalOpen: true,
          }));
      },
    },
    modalOpen: false,
    pointerLocation: {
      x: 0,
      y: 0,
    },
    selectedNode: { name: null },
  });

  useEffect(async () => {
    const { nodes, edges, nodeData } = await fetchNetworkData();
    setState({
      ...state,
      nodeData,
      graph: { nodes: nodes.map((uid) => makeNode(nodeData[uid])), edges },
    });
  }, []);

  const { graph, events, selectedNode, modalOpen, pointerLocation } = state;
  const { name: nodeName, ...nodeData } = selectedNode;
  return (
    <Container maxWidth="true" title="network-container">
      <NetworkModal
        nodeName={nodeName}
        nodeData={nodeData}
        modalOpen={modalOpen}
        pointerLocation={pointerLocation}
        setClosed={() => setState((state) => ({ ...state, modalOpen: false }))}
      />
      <Graph graph={graph} options={options} events={events} />
    </Container>
  );
};

export default MonitorGraph;
