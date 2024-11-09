import Breadcrumbs from '@/shared/components/breadcrumbs';
import React from 'react'

const BreadCrumbPreviewer = () => {
  return (
    <Breadcrumbs
    parent={{
      title: "Parent",
      link: "#",
    }}
    childList={[
      {
        title: "C1",
        link: "#",
      },
      {
        title: "C2",
        onCallBack(e) {
          console.log(e);
        },
      },
      {
        title: "C3",
      },
    ]}
  />
  )
}

export default BreadCrumbPreviewer