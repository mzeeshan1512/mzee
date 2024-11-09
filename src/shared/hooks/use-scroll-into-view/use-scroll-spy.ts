import { useState, useEffect, RefObject } from 'react';

interface UseScrollSpyOptionsId {
  id: string;
  ref?: never;
}

interface UseScrollSpyOptionsRef {
  id?: never;
  ref: RefObject<HTMLElement>;
}

type UseScrollSpyOptions = ({threshold?:number}&(UseScrollSpyOptionsId | UseScrollSpyOptionsRef));

interface ScrollSpyResult {
  isInView: boolean;
  elementName: string | null;
}

const useScrollSpy= ({ id, ref, threshold = 0.1 }: UseScrollSpyOptions): ScrollSpyResult =>{
  const [isInView, setIsInView] = useState(false);
  const [elementName, setElementName] = useState<string | null>(null);

  useEffect(() => {
    const targetElement = ref?.current || (id ? document.getElementById(id) : null);

    if (!targetElement) {
      return;
    }

    const nameOrId = targetElement.getAttribute('name') || targetElement.id;
    setElementName(nameOrId);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,       
      threshold, 
    });

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, [id, ref, threshold]);

  return { isInView, elementName };
}

export default useScrollSpy;
