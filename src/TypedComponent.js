import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypedComponent(options){
	// Create reference to store the DOM element containing the animation
	const el = useRef(null);
  // Create reference to store the Typed instance itself
	const typed = useRef(null);

  const fixedText = options

  useEffect(() => {
    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, fixedText);
    
    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
  }, [])

  return (
    <div >
        <span ref={el} />
    </div>
  );
}
