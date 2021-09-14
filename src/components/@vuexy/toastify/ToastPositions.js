import React, { useEffect } from "react"
import { Button } from "reactstrap"
import { toast } from "react-toastify"

export default function ToastrPositions() {
  const notifyTopCenter = () =>
    toast.info("Top Center", {
      position: toast.POSITION.TOP_CENTER
    })
  return (
    <div className="d-inline-block mr-1 mb-1">
      {/* <Button.Ripple
              color="primary"
              outline
              onClick={this.notifyTopCenter}
            >
              ok
            </Button.Ripple> */}
    </div>
  )
}
