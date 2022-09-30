import { ReactNode } from "react";


interface Props {
    children: ReactNode
}

function Layout(props : Props) {
    return (
      <div className="page-layout">
        {props.children}
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.8;
            color: black;
            background-color: white;
            font-family: Roboto;
            align-items: center;
          }
          h1 {
            font-weight: 700;
          }
          p {
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    );
  }
  
  export default Layout;