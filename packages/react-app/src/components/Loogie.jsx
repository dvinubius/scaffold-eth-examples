import React from "react"

const Loogie = ({color, chubbiness, message}) => (
  <svg width={400} height={400} xmlns="http://www.w3.org/2000/svg">
    <g strokeWidth={3} stroke="#000" id="eye-1">
      <circle cy={154.5} cx={181.5} fill="#fff" r={29.5} />
      <ellipse ry={3.5} rx={2.5} cy={154.5} cx={173.5} />
    </g>
    <ellipse
      fill={color}
      strokeWidth={3}
      cx={204.5}
      cy={211.801}
      rx={chubbiness}
      ry={51.801}
      stroke="#000"
      id="head"
    />
    <g strokeWidth={3} stroke="#000" id="eye-2">
      <circle cy={168.5} cx={209.5} fill="#fff" r={29.5} />
      <ellipse ry={3.5} rx={3} cy={169.5} cx={208} />
    </g>
    <foreignObject
      x={0}
      y="50%"
      width={360}
      height={70}
      transform="translate(20 100)"
      id="message"
    >
      <p
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          color: "#111",
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {
          message
        }
      </p>
    </foreignObject>
  </svg>
)

export default Loogie;
