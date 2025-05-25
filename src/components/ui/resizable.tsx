"use client"

import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"
import { ComponentProps, createContext, forwardRef, useContext } from "react"

const ResizablePanelGroupContext = createContext<{
  direction: "horizontal" | "vertical"
  id: string
} | null>(null)

const ResizablePanelGroup = forwardRef<
  React.ElementRef<typeof ResizablePrimitive.PanelGroup>,
  ComponentProps<typeof ResizablePrimitive.PanelGroup>
>(({ className, direction = "horizontal", ...props }, ref) => (
  <ResizablePanelGroupContext.Provider
    value={{ id: props.id ?? " bilmiyorum", direction }}
  >
    <ResizablePrimitive.PanelGroup
      ref={ref}
      direction={direction}
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  </ResizablePanelGroupContext.Provider>
))
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = ResizablePrimitive.Panel
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = forwardRef<
  React.ElementRef<typeof ResizablePrimitive.PanelResizeHandle>,
  ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean
  }
>(({ className, withHandle, ...props }, ref) => {
  const context = useContext(ResizablePanelGroupContext)

  return (
    <ResizablePrimitive.PanelResizeHandle
      ref={ref}
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=horizontal]]:hover:bg-border-hover [&[data-panel-group-direction=vertical]]:hover:bg-border-hover [&[data-panel-group-direction=horizontal]]:active:bg-border-active [&[data-panel-group-direction=vertical]]:active:bg-border-active",
        context?.direction === "horizontal" ? "cursor-col-resize" : "cursor-row-resize",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <div className="h-2.5 w-px bg-gray-400 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
})
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
