import dynamic from "next/dynamic";

const NoSSRForceGraph = dynamic(() => import("./force3d"), {
  ssr: false,
});

function htmlAddress(node) {
  const address = node.id
  const name = node.name
  const addBegin = address.substring(0, 6);
  const addEnd = address.substring(address.length - 4, address.length);
  if(name) {
    return `<b>Address: </b> ${name}`
  }
  return `<b>Address:</b> ${addBegin}...${addEnd}`;
}

const label = (node) => {
  // TODO: show inflow and outflow after dividing or not
  return `<div class="bg-gray-900 rounded-lg px-4 py-2">
      <span>${htmlAddress(node)}</span>
      <br />
      <span><b>Total Outflow:</b> ${node.totalOutflowRate}</span>
      <br />
      <span><b>Total Inflow:</b> ${node.totalInflowRate}</span>
    </div>`;
};

function Graph(gData) {
  if (typeof window !== "undefined") {
    return (
      <NoSSRForceGraph
        graphData={gData}
        linkCurvature="curvature"
        linkCurveRotation="rotation"
        linkDirectionalParticles={2}
        nodeLabel={node => label(node)}
        nodeVal="nodeRelSize"
        nodeRelSize={3}
        width={window.innerWidth * 7/10}
        height={window.innerHeight}
        backgroundColor="rgb(24,24,32)"
      />
    );
  }
}

export default Graph;
