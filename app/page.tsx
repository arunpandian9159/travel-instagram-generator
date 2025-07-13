"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Download, Palette, Edit3, Layout, Eye } from "lucide-react"
import html2canvas from "html2canvas"

interface TravelData {
  title: string
  date: string
  destination: string
  packageDetails: string
  itinerary: string
  plan: string
  inclusions: string
  exclusions: string
  price: string
  overlays: string
}

interface ElementStyle {
  fontFamily: string
  fontSize: number
  fontWeight: string
  color: string
  backgroundColor: string
  padding: number
  borderRadius: number
  textAlign: "left" | "center" | "right"
  opacity: number
  textTransform?: string
  lineHeight?: string | number
  border?: string
}

interface TemplateElement {
  id: string
  type: "text" | "price" | "image" | "badge" | "divider"
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  style: ElementStyle
  field?: keyof TravelData
  locked?: boolean
}

interface TemplateLayout {
  id: string
  name: string
  dimensions: { width: number; height: number }
  displaySize: { width: number; height: number }
  elements: TemplateElement[]
  backgroundStyle: {
    backgroundColor: string
    backgroundImage: string
    overlay: boolean
    overlayOpacity: number
  }
}

const defaultElementStyle: ElementStyle = {
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: "400",
  color: "#1a1a1a",
  backgroundColor: "transparent",
  padding: 8,
  borderRadius: 4,
  textAlign: "left",
  opacity: 1,
}

const defaultTravelData: TravelData = {
  title: "Amazing Bali Adventure",
  date: "March 15-22, 2024",
  destination: "Bali, Indonesia",
  packageDetails: "7 Days / 6 Nights",
  itinerary:
    "Day 1: Arrival & Ubud\nDay 2: Rice Terraces\nDay 3: Volcano Trek\nDay 4: Beach Day\nDay 5: Cultural Tour\nDay 6: Water Sports\nDay 7: Departure",
  plan: "All-inclusive luxury experience with guided tours and premium accommodations",
  overlays: "Free WiFi, Airport Transfer, Welcome Drink",
  inclusions: "Accommodation, Meals, Transportation, Guide, Activities",
  exclusions: "International Flights, Personal Expenses, Travel Insurance",
  price: "$1,299",
}

const templateFormats: TemplateLayout[] = [
  {
    id: "square",
    name: "Square\n1080 x 1080 px",
    dimensions: { width: 1080, height: 1080 },
    displaySize: { width: 400, height: 400 },
    backgroundStyle: {
      backgroundColor: "#ffffff",
      backgroundImage: "/images/11.jpg",
      overlay: false,
      overlayOpacity: 0.3,
    },
    elements: [
      {
        id: "title",
        type: "text",
        content: "title",
        field: "title",
        position: { x: 20, y: 20 },
        size: { width: 360, height: 60 },
        style: { ...defaultElementStyle, fontSize: 28, fontWeight: "700", textAlign: "center", color: "#1a1a1a" },
      },
      {
        id: "destination",
        type: "text",
        content: "destination",
        field: "destination",
        position: { x: 20, y: 90 },
        size: { width: 360, height: 30 },
        style: { ...defaultElementStyle, fontSize: 16, color: "#3b82f6", textAlign: "center" },
      },
      {
        id: "price",
        type: "price",
        content: "price",
        field: "price",
        position: { x: 150, y: 130 },
        size: { width: 100, height: 40 },
        style: {
          ...defaultElementStyle,
          fontSize: 20,
          fontWeight: "700",
          color: "#ffffff",
          backgroundColor: "#3b82f6",
          textAlign: "center",
          borderRadius: 20,
        },
      },
      {
        id: "package",
        type: "text",
        content: "packageDetails",
        field: "packageDetails",
        position: { x: 20, y: 180 },
        size: { width: 360, height: 25 },
        style: { ...defaultElementStyle, fontSize: 14, textAlign: "center", fontWeight: "500" },
      },
      {
        id: "date",
        type: "text",
        content: "date",
        field: "date",
        position: { x: 20, y: 210 },
        size: { width: 360, height: 25 },
        style: { ...defaultElementStyle, fontSize: 12, textAlign: "center", opacity: 0.8 },
      },
      {
        id: "plan",
        type: "text",
        content: "plan",
        field: "plan",
        position: { x: 20, y: 260 },
        size: { width: 360, height: 50 },
        style: { ...defaultElementStyle, fontSize: 12, textAlign: "center" },
      },
      {
        id: "inclusions",
        type: "text",
        content: "inclusions",
        field: "inclusions",
        position: { x: 20, y: 320 },
        size: { width: 170, height: 60 },
        style: { ...defaultElementStyle, fontSize: 10 },
      },
      {
        id: "exclusions",
        type: "text",
        content: "exclusions",
        field: "exclusions",
        position: { x: 210, y: 320 },
        size: { width: 170, height: 60 },
        style: { ...defaultElementStyle, fontSize: 10 },
      },
    ],
  },
  {
    id: "story",
    name: "Story\n1080 x 1920 px",
    dimensions: { width: 1080, height: 1920 },
    displaySize: { width: 225, height: 400 },
    backgroundStyle: {
      backgroundColor: "#0f172a",
      backgroundImage: "/images/1.jpg",
      overlay: true,
      overlayOpacity: 0.4,
    },
    elements: [
      {
        id: "destination",
        type: "text",
        content: "destination",
        field: "destination",
        position: { x: 20, y: 30 },
        size: { width: 185, height: 25 },
        style: { ...defaultElementStyle, fontSize: 10, color: "#64748b", textTransform: "uppercase" as any },
      },
      {
        id: "title",
        type: "text",
        content: "title",
        field: "title",
        position: { x: 20, y: 60 },
        size: { width: 185, height: 80 },
        style: { ...defaultElementStyle, fontSize: 18, fontWeight: "800", color: "#ffffff", lineHeight: "1.2" as any },
      },
      {
        id: "price",
        type: "price",
        content: "price",
        field: "price",
        position: { x: 150, y: 30 },
        size: { width: 55, height: 30 },
        style: { ...defaultElementStyle, fontSize: 14, fontWeight: "700", color: "#10b981", textAlign: "right" },
      },
      {
        id: "package",
        type: "text",
        content: "packageDetails",
        field: "packageDetails",
        position: { x: 20, y: 150 },
        size: { width: 100, height: 25 },
        style: { ...defaultElementStyle, fontSize: 10, color: "#94a3b8", fontWeight: "500" },
      },
      {
        id: "date",
        type: "text",
        content: "date",
        field: "date",
        position: { x: 130, y: 150 },
        size: { width: 75, height: 25 },
        style: { ...defaultElementStyle, fontSize: 10, color: "#94a3b8", textAlign: "right" },
      },
      {
        id: "plan",
        type: "text",
        content: "plan",
        field: "plan",
        position: { x: 20, y: 185 },
        size: { width: 185, height: 80 },
        style: { ...defaultElementStyle, fontSize: 11, color: "#e2e8f0", lineHeight: "1.4" as any },
      },
      {
        id: "highlights",
        type: "text",
        content: "overlays",
        field: "overlays",
        position: { x: 20, y: 275 },
        size: { width: 185, height: 40 },
        style: {
          ...defaultElementStyle,
          fontSize: 9,
          color: "#fbbf24",
          backgroundColor: "#451a03",
          padding: 10,
          borderRadius: 6,
        },
      },
      {
        id: "inclusions",
        type: "text",
        content: "inclusions",
        field: "inclusions",
        position: { x: 20, y: 325 },
        size: { width: 185, height: 60 },
        style: { ...defaultElementStyle, fontSize: 9, color: "#cbd5e1" },
      },
    ],
  },
  {
    id: "portrait",
    name: "Portrait\n1080 x 1350 px",
    dimensions: { width: 1080, height: 1350 },
    displaySize: { width: 320, height: 400 },
    backgroundStyle: {
      backgroundColor: "#fafafa",
      backgroundImage: "/images/2.jpg",
      overlay: false,
      overlayOpacity: 0.3,
    },
    elements: [
      {
        id: "price",
        type: "price",
        content: "price",
        field: "price",
        position: { x: 20, y: 20 },
        size: { width: 70, height: 70 },
        style: {
          ...defaultElementStyle,
          fontSize: 16,
          fontWeight: "600",
          color: "#1f2937",
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderRadius: 35,
          border: "2px solid #e5e7eb" as any,
        },
      },
      {
        id: "title",
        type: "text",
        content: "title",
        field: "title",
        position: { x: 110, y: 25 },
        size: { width: 190, height: 60 },
        style: { ...defaultElementStyle, fontSize: 20, fontWeight: "600", color: "#1f2937" },
      },
      {
        id: "destination",
        type: "text",
        content: "destination",
        field: "destination",
        position: { x: 110, y: 70 },
        size: { width: 190, height: 25 },
        style: { ...defaultElementStyle, fontSize: 12, color: "#6b7280" },
      },
      {
        id: "package",
        type: "text",
        content: "packageDetails",
        field: "packageDetails",
        position: { x: 20, y: 110 },
        size: { width: 140, height: 25 },
        style: { ...defaultElementStyle, fontSize: 11, color: "#374151", fontWeight: "500" },
      },
      {
        id: "date",
        type: "text",
        content: "date",
        field: "date",
        position: { x: 170, y: 110 },
        size: { width: 130, height: 25 },
        style: { ...defaultElementStyle, fontSize: 11, color: "#6b7280", textAlign: "right" },
      },
      {
        id: "plan",
        type: "text",
        content: "plan",
        field: "plan",
        position: { x: 20, y: 150 },
        size: { width: 280, height: 80 },
        style: {
          ...defaultElementStyle,
          fontSize: 12,
          color: "#374151",
          lineHeight: "1.5" as any,
          backgroundColor: "#ffffff",
          padding: 12,
          borderRadius: 8,
        },
      },
      {
        id: "inclusions",
        type: "text",
        content: "inclusions",
        field: "inclusions",
        position: { x: 20, y: 250 },
        size: { width: 135, height: 120 },
        style: {
          ...defaultElementStyle,
          fontSize: 10,
          color: "#4b5563",
          backgroundColor: "#ffffff",
          padding: 10,
          borderRadius: 6,
        },
      },
      {
        id: "exclusions",
        type: "text",
        content: "exclusions",
        field: "exclusions",
        position: { x: 165, y: 250 },
        size: { width: 135, height: 120 },
        style: {
          ...defaultElementStyle,
          fontSize: 10,
          color: "#4b5563",
          backgroundColor: "#ffffff",
          padding: 10,
          borderRadius: 6,
        },
      },
    ],
  },
]

const fontOptions = ["Inter", "Roboto", "Playfair Display", "Montserrat", "Poppins", "Lora", "Open Sans"]
const fontWeights = ["300", "400", "500", "600", "700", "800"]

export default function EnhancedTravelTemplateGenerator() {
  const [travelData, setTravelData] = useState<TravelData>(defaultTravelData)
  const [currentLayout, setCurrentLayout] = useState<TemplateLayout>(templateFormats[0])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const templateRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: keyof TravelData, value: string) => {
    setTravelData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLayoutChange = (layoutId: string) => {
    const layout = templateFormats.find((l) => l.id === layoutId)
    if (layout) {
      setCurrentLayout(layout)
      setSelectedElement(null)
    }
  }

  const handleElementStyleChange = (elementId: string, styleProperty: keyof ElementStyle, value: any) => {
    setCurrentLayout((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === elementId ? { ...el, style: { ...el.style, [styleProperty]: value } } : el,
      ),
    }))
  }

  const handleElementPositionChange = (elementId: string, position: { x: number; y: number }) => {
    setCurrentLayout((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === elementId ? { ...el, position } : el)),
    }))
  }

  const handleElementSizeChange = (elementId: string, size: { width: number; height: number }) => {
    setCurrentLayout((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === elementId ? { ...el, size } : el)),
    }))
  }

  const handleBackgroundStyleChange = (property: string, value: any) => {
    setCurrentLayout((prev) => ({
      ...prev,
      backgroundStyle: { ...prev.backgroundStyle, [property]: value },
    }))
  }

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (e.button !== 0) return // Only left click

    const element = currentLayout.elements.find((el) => el.id === elementId)
    if (!element || element.locked) return

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(elementId)
    setSelectedElement(elementId)
    e.preventDefault()
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !templateRef.current) return

      const templateRect = templateRef.current.getBoundingClientRect()
      const scale = Math.floor(currentLayout.displaySize.width * 1.5) / currentLayout.displaySize.width
      const maxX = Math.floor(currentLayout.displaySize.width * 1.5) - 50
      const maxY = Math.floor(currentLayout.displaySize.height * 1.5) - 20

      const newX = Math.max(0, Math.min(maxX, e.clientX - templateRect.left - dragOffset.x)) / scale
      const newY = Math.max(0, Math.min(maxY, e.clientY - templateRect.top - dragOffset.y)) / scale

      handleElementPositionChange(isDragging, { x: newX, y: newY })
    },
    [isDragging, dragOffset, currentLayout],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  // Add event listeners for drag functionality
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const exportTemplate = async () => {
    if (templateRef.current) {
      // The template is rendered at 1.5x scale in the UI
      const uiScale = 1.5
      const uiWidth = Math.floor(currentLayout.displaySize.width * uiScale)
      const uiHeight = Math.floor(currentLayout.displaySize.height * uiScale)
      
      // Calculate the scale needed to reach the target dimensions
      const targetScale = Math.max(
        currentLayout.dimensions.width / uiWidth,
        currentLayout.dimensions.height / uiHeight
      )

      const canvas = await html2canvas(templateRef.current, {
        width: uiWidth,
        height: uiHeight,
        scale: targetScale,
        backgroundColor: currentLayout.backgroundStyle.backgroundColor,
        useCORS: true,
        allowTaint: true,
      })

      const link = document.createElement("a")
      link.download = `${travelData.title.replace(/\s+/g, "-").toLowerCase()}-${currentLayout.id}-${currentLayout.dimensions.width}x${currentLayout.dimensions.height}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const getElementContent = (element: TemplateElement): string => {
    if (element.field && travelData[element.field]) {
      return travelData[element.field]
    }
    return element.content
  }

  const selectedElementData = selectedElement ? currentLayout.elements.find((el) => el.id === selectedElement) : null

  const DraggableElement = ({ element }: { element: TemplateElement }) => {
    const content = getElementContent(element)
    const isSelected = selectedElement === element.id
    const isDraggingThis = isDragging === element.id

    const scale = Math.floor(currentLayout.displaySize.width * 1.5) / currentLayout.displaySize.width

    const elementStyle: React.CSSProperties = {
      position: "absolute",
      left: element.position.x * scale,
      top: element.position.y * scale,
      width: element.size.width * scale,
      height: element.size.height * scale,
      fontFamily: element.style.fontFamily,
      fontSize: element.style.fontSize * scale,
      fontWeight: element.style.fontWeight,
      color: element.style.color,
      backgroundColor: element.style.backgroundColor,
      padding: element.style.padding * scale,
      borderRadius: element.style.borderRadius * scale,
      textAlign: element.style.textAlign,
      opacity: element.style.opacity,
      cursor: element.locked ? "default" : "move",
      border: isSelected ? `${2 * scale}px solid #3b82f6` : `${2 * scale}px solid transparent`,
      outline: isSelected ? `${1 * scale}px solid #ffffff` : "none",
      outlineOffset: isSelected ? `${2 * scale}px` : "0",
      zIndex: isSelected ? 1000 : isDraggingThis ? 999 : 1,
      userSelect: "none",
      display: "flex",
      alignItems: element.type === "price" ? "center" : "flex-start",
      justifyContent:
        element.style.textAlign === "center"
          ? "center"
          : element.style.textAlign === "right"
            ? "flex-end"
            : "flex-start",
      lineHeight: (element.style as any).lineHeight || "normal",
      textTransform: (element.style as any).textTransform || "none",
      whiteSpace: element.type === "text" && content.includes("\n") ? "pre-wrap" : "normal",
      overflow: "hidden",
    }

    if (element.type === "divider") {
      return (
        <div
          style={elementStyle}
          onMouseDown={(e) => handleMouseDown(e, element.id)}
          onClick={() => setSelectedElement(element.id)}
        />
      )
    }

    return (
      <div
        style={elementStyle}
        onMouseDown={(e) => handleMouseDown(e, element.id)}
        onClick={() => setSelectedElement(element.id)}
      >
        {element.type === "price" && !content.startsWith("$") ? "$" : ""}
        {content}
        {isSelected && !element.locked && (
          <div
            className="absolute bg-blue-500 rounded-full border-2 border-white"
            style={{
              top: -1 * scale,
              right: -1 * scale,
              width: 3 * scale,
              height: 3 * scale,
            }}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Advanced Travel Instagram Generator</h1>
          <p className="text-gray-600">
            Create, customize, and design stunning Instagram posts with drag-and-drop functionality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
          {/* Travel Information - Left */}
          <div className="lg:col-span-1 order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Travel Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Package Title</Label>
                  <Input
                    id="title"
                    value={travelData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter package title"
                  />
                </div>

                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={travelData.destination}
                    onChange={(e) => handleInputChange("destination", e.target.value)}
                    placeholder="Enter destination"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="date">Travel Date</Label>
                    <Input
                      id="date"
                      value={travelData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      placeholder="Enter dates"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={travelData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="Enter price"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="packageDetails">Package Details</Label>
                  <Input
                    id="packageDetails"
                    value={travelData.packageDetails}
                    onChange={(e) => handleInputChange("packageDetails", e.target.value)}
                    placeholder="e.g., 7 Days / 6 Nights"
                  />
                </div>

                <div>
                  <Label htmlFor="plan">Travel Plan</Label>
                  <Textarea
                    id="plan"
                    value={travelData.plan}
                    onChange={(e) => handleInputChange("plan", e.target.value)}
                    placeholder="Brief description of the travel plan"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="inclusions">Inclusions</Label>
                  <Textarea
                    id="inclusions"
                    value={travelData.inclusions}
                    onChange={(e) => handleInputChange("inclusions", e.target.value)}
                    placeholder="What's included in the package"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="exclusions">Exclusions</Label>
                  <Textarea
                    id="exclusions"
                    value={travelData.exclusions}
                    onChange={(e) => handleInputChange("exclusions", e.target.value)}
                    placeholder="What's not included"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="overlays">Special Offers</Label>
                  <Input
                    id="overlays"
                    value={travelData.overlays}
                    onChange={(e) => handleInputChange("overlays", e.target.value)}
                    placeholder="Special offers or highlights"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Preview - Center */}
          <div className="lg:col-span-1 order-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Template Designer
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (templateRef.current) {
                          // Get the stylesheets from the current document
                          const stylesheets = Array.from(document.styleSheets)
                            .map((sheet) => {
                              try {
                                if (sheet.href) {
                                  return `<link rel="stylesheet" href="${sheet.href}" />`;
                                }
                              } catch (e) {}
                              return "";
                            })
                            .join("");
                          // Add Tailwind CDN as fallback
                          const tailwindCdn = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">`;

                          // Create the template HTML with absolute URLs
                          const backgroundImageUrl = currentLayout.backgroundStyle.backgroundImage 
                            ? currentLayout.backgroundStyle.backgroundImage.startsWith('/') 
                              ? `${window.location.origin}${currentLayout.backgroundStyle.backgroundImage}`
                              : currentLayout.backgroundStyle.backgroundImage
                            : 'none';

                          const templateHTML = `
                            <div
                              class="relative shadow-lg overflow-hidden"
                              style="
                                width: ${Math.floor(currentLayout.displaySize.width * 1.5)}px;
                                height: ${Math.floor(currentLayout.displaySize.height * 1.5)}px;
                                background-color: ${currentLayout.backgroundStyle.backgroundColor};
                                background-image: ${backgroundImageUrl !== 'none' ? `url('${backgroundImageUrl}')` : 'none'};
                                background-size: cover;
                                background-position: center;
                              "
                            >
                              ${currentLayout.backgroundStyle.overlay && currentLayout.backgroundStyle.backgroundImage ? `
                                <div
                                  class="absolute inset-0 bg-black"
                                  style="opacity: ${currentLayout.backgroundStyle.overlayOpacity};"
                                ></div>
                              ` : ''}
                              
                              ${currentLayout.elements.map((element) => {
                                const content = element.field && travelData[element.field] ? travelData[element.field] : element.content;
                                const scale = Math.floor(currentLayout.displaySize.width * 1.5) / currentLayout.displaySize.width;
                                
                                const elementStyle = `
                                  position: absolute;
                                  left: ${element.position.x * scale}px;
                                  top: ${element.position.y * scale}px;
                                  width: ${element.size.width * scale}px;
                                  height: ${element.size.height * scale}px;
                                  font-family: ${element.style.fontFamily};
                                  font-size: ${element.style.fontSize * scale}px;
                                  font-weight: ${element.style.fontWeight};
                                  color: ${element.style.color};
                                  background-color: ${element.style.backgroundColor};
                                  padding: ${element.style.padding * scale}px;
                                  border-radius: ${element.style.borderRadius * scale}px;
                                  text-align: ${element.style.textAlign};
                                  opacity: ${element.style.opacity};
                                  display: flex;
                                  align-items: ${element.type === "price" ? "center" : "flex-start"};
                                  justify-content: ${element.style.textAlign === "center" ? "center" : element.style.textAlign === "right" ? "flex-end" : "flex-start"};
                                  line-height: ${(element.style as any).lineHeight || "normal"};
                                  text-transform: ${(element.style as any).textTransform || "none"};
                                  white-space: ${element.type === "text" && content.includes("\n") ? "pre-wrap" : "normal"};
                                  overflow: hidden;
                                  border: 2px solid transparent;
                                  outline: none;
                                  z-index: 1;
                                  user-select: none;
                                `;
                                
                                return `
                                  <div style="${elementStyle}">
                                    ${element.type === "price" && !content.startsWith("$") ? "$" : ""}${content}
                                  </div>
                                `;
                              }).join('')}
                            </div>
                          `;

                          const html = `
                            <html>
                              <head>
                                <title>Template Preview</title>
                                ${tailwindCdn}
                                ${stylesheets}
                                <style>body { background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }</style>
                              </head>
                              <body>
                                ${templateHTML}
                              </body>
                            </html>
                          `;
                          const blob = new Blob([html], { type: "text/html" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.target = "_blank";
                          a.rel = "noopener noreferrer";
                          document.body.appendChild(a);
                          a.click();
                          setTimeout(() => {
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }, 1000);
                        }
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Select value={currentLayout.id} onValueChange={handleLayoutChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templateFormats.map((layout) => (
                          <SelectItem key={layout.id} value={layout.id}>
                            {layout.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={exportTemplate} size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div
                    ref={templateRef}
                    className="relative shadow-lg overflow-hidden"
                    style={{
                      width: `${Math.floor(currentLayout.displaySize.width * 1.5)}px`,
                      height: `${Math.floor(currentLayout.displaySize.height * 1.5)}px`,
                      backgroundColor: currentLayout.backgroundStyle.backgroundColor,
                      backgroundImage: currentLayout.backgroundStyle.backgroundImage
                        ? `url(${currentLayout.backgroundStyle.backgroundImage})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => setSelectedElement(null)}
                  >
                    {/* Background overlay */}
                    {currentLayout.backgroundStyle.overlay && currentLayout.backgroundStyle.backgroundImage && (
                      <div
                        className="absolute inset-0 bg-black"
                        style={{ opacity: currentLayout.backgroundStyle.overlayOpacity }}
                      />
                    )}

                    {/* Render all elements */}
                    {currentLayout.elements.map((element) => (
                      <DraggableElement key={element.id} element={element} />
                    ))}

                    {/* Selection indicator */}
                    {selectedElement && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {selectedElementData?.type} selected
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Settings - Right */}
          <div className="lg:col-span-1 order-3 lg:sticky lg:top-8 self-start">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  {selectedElement ? `Customize ${selectedElementData?.type}` : "Template Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedElement && selectedElementData ? (
                  <Tabs defaultValue="style" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="style">Style</TabsTrigger>
                      <TabsTrigger value="layout">Layout</TabsTrigger>
                      <TabsTrigger value="effects">Effects</TabsTrigger>
                    </TabsList>

                    <TabsContent value="style" className="space-y-4">
                      <div>
                        <Label>Font Family</Label>
                        <Select
                          value={selectedElementData.style.fontFamily}
                          onValueChange={(value) => handleElementStyleChange(selectedElement, "fontFamily", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map((font) => (
                              <SelectItem key={font} value={font}>
                                <span style={{ fontFamily: font }}>{font}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Font Size</Label>
                        <Input
                          type="range"
                          min="8"
                          max="48"
                          value={selectedElementData.style.fontSize}
                          onChange={(e) =>
                            handleElementStyleChange(selectedElement, "fontSize", Number.parseInt(e.target.value))
                          }
                          className="mt-2"
                        />
                        <span className="text-sm text-gray-500">{selectedElementData.style.fontSize}px</span>
                      </div>

                      <div>
                        <Label>Font Weight</Label>
                        <Select
                          value={selectedElementData.style.fontWeight}
                          onValueChange={(value) => handleElementStyleChange(selectedElement, "fontWeight", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontWeights.map((weight) => (
                              <SelectItem key={weight} value={weight}>
                                {weight === "300"
                                  ? "Light"
                                  : weight === "400"
                                    ? "Regular"
                                    : weight === "500"
                                      ? "Medium"
                                      : weight === "600"
                                        ? "Semi Bold"
                                        : weight === "700"
                                          ? "Bold"
                                          : "Extra Bold"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Text Color</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            type="color"
                            value={selectedElementData.style.color}
                            onChange={(e) => handleElementStyleChange(selectedElement, "color", e.target.value)}
                            className="w-12 h-10 p-1 border rounded"
                          />
                          <Input
                            value={selectedElementData.style.color}
                            onChange={(e) => handleElementStyleChange(selectedElement, "color", e.target.value)}
                            placeholder="#000000"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Background Color</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            type="color"
                            value={selectedElementData.style.backgroundColor}
                            onChange={(e) =>
                              handleElementStyleChange(selectedElement, "backgroundColor", e.target.value)
                            }
                            className="w-12 h-10 p-1 border rounded"
                          />
                          <Input
                            value={selectedElementData.style.backgroundColor}
                            onChange={(e) =>
                              handleElementStyleChange(selectedElement, "backgroundColor", e.target.value)
                            }
                            placeholder="transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Text Alignment</Label>
                        <div className="flex gap-1 mt-2">
                          {(["left", "center", "right"] as const).map((align) => (
                            <Button
                              key={align}
                              variant={selectedElementData.style.textAlign === align ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleElementStyleChange(selectedElement, "textAlign", align)}
                              className="flex-1"
                            >
                              {align}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="layout" className="space-y-4">
                      <div>
                        <Label>Position X</Label>
                        <Input
                          type="number"
                          value={selectedElementData.position.x}
                          onChange={(e) =>
                            handleElementPositionChange(selectedElement, {
                              ...selectedElementData.position,
                              x: Number.parseInt(e.target.value) || 0,
                            })
                          }
                          min="0"
                          max="350"
                        />
                      </div>

                      <div>
                        <Label>Position Y</Label>
                        <Input
                          type="number"
                          value={selectedElementData.position.y}
                          onChange={(e) =>
                            handleElementPositionChange(selectedElement, {
                              ...selectedElementData.position,
                              y: Number.parseInt(e.target.value) || 0,
                            })
                          }
                          min="0"
                          max="380"
                        />
                      </div>

                      <div>
                        <Label>Width</Label>
                        <Input
                          type="number"
                          value={selectedElementData.size.width}
                          onChange={(e) =>
                            handleElementSizeChange(selectedElement, {
                              ...selectedElementData.size,
                              width: Number.parseInt(e.target.value) || 50,
                            })
                          }
                          min="50"
                          max="400"
                        />
                      </div>

                      <div>
                        <Label>Height</Label>
                        <Input
                          type="number"
                          value={selectedElementData.size.height}
                          onChange={(e) =>
                            handleElementSizeChange(selectedElement, {
                              ...selectedElementData.size,
                              height: Number.parseInt(e.target.value) || 20,
                            })
                          }
                          min="20"
                          max="400"
                        />
                      </div>

                      <div>
                        <Label>Padding</Label>
                        <Input
                          type="range"
                          min="0"
                          max="32"
                          value={selectedElementData.style.padding}
                          onChange={(e) =>
                            handleElementStyleChange(selectedElement, "padding", Number.parseInt(e.target.value))
                          }
                          className="mt-2"
                        />
                        <span className="text-sm text-gray-500">{selectedElementData.style.padding}px</span>
                      </div>

                      <div>
                        <Label>Border Radius</Label>
                        <Input
                          type="range"
                          min="0"
                          max="50"
                          value={selectedElementData.style.borderRadius}
                          onChange={(e) =>
                            handleElementStyleChange(selectedElement, "borderRadius", Number.parseInt(e.target.value))
                          }
                          className="mt-2"
                        />
                        <span className="text-sm text-gray-500">{selectedElementData.style.borderRadius}px</span>
                      </div>
                    </TabsContent>

                    <TabsContent value="effects" className="space-y-4">
                      <div>
                        <Label>Opacity</Label>
                        <Input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={selectedElementData.style.opacity}
                          onChange={(e) =>
                            handleElementStyleChange(selectedElement, "opacity", Number.parseFloat(e.target.value))
                          }
                          className="mt-2"
                        />
                        <span className="text-sm text-gray-500">
                          {Math.round(selectedElementData.style.opacity * 100)}%
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="lock-element"
                          checked={selectedElementData.locked || false}
                          onCheckedChange={(checked) => {
                            setCurrentLayout((prev) => ({
                              ...prev,
                              elements: prev.elements.map((el) =>
                                el.id === selectedElement ? { ...el, locked: checked } : el,
                              ),
                            }))
                          }}
                        />
                        <Label htmlFor="lock-element">Lock Element</Label>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-sm font-medium">Quick Actions</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const element = selectedElementData
                              setCurrentLayout((prev) => ({
                                ...prev,
                                elements: prev.elements.map((el) =>
                                  el.id === selectedElement
                                    ? { ...el, position: { x: 20, y: element.position.y } }
                                    : el,
                                ),
                              }))
                            }}
                          >
                            Align Left
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const element = selectedElementData
                              setCurrentLayout((prev) => ({
                                ...prev,
                                elements: prev.elements.map((el) =>
                                  el.id === selectedElement
                                    ? { ...el, position: { x: 200 - element.size.width / 2, y: element.position.y } }
                                    : el,
                                ),
                              }))
                            }}
                          >
                            Center
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const element = selectedElementData
                              setCurrentLayout((prev) => ({
                                ...prev,
                                elements: prev.elements.map((el) =>
                                  el.id === selectedElement
                                    ? { ...el, position: { x: 380 - element.size.width, y: element.position.y } }
                                    : el,
                                ),
                              }))
                            }}
                          >
                            Align Right
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentLayout((prev) => ({
                                ...prev,
                                elements: prev.elements.map((el) =>
                                  el.id === selectedElement ? { ...el, position: { x: el.position.x, y: 20 } } : el,
                                ),
                              }))
                            }}
                          >
                            Top
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <Tabs defaultValue="background" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="background">Background</TabsTrigger>
                      <TabsTrigger value="layouts">Layouts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="background" className="space-y-4">
                      <div>
                        <Label>Background Color</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            type="color"
                            value={currentLayout.backgroundStyle.backgroundColor}
                            onChange={(e) => handleBackgroundStyleChange("backgroundColor", e.target.value)}
                            className="w-12 h-10 p-1 border rounded"
                          />
                          <Input
                            value={currentLayout.backgroundStyle.backgroundColor}
                            onChange={(e) => handleBackgroundStyleChange("backgroundColor", e.target.value)}
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Background Image</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Button
                            variant={!currentLayout.backgroundStyle.backgroundImage ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleBackgroundStyleChange("backgroundImage", "")}
                          >
                            None
                          </Button>
                          {(() => {
                            const backgroundImages =
                              currentLayout.id === "square"
                                ? ["/images/11.jpg", "/images/22.jpg", "/images/33.jpg"]
                                : ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]

                            return backgroundImages.map((img, index) => (
                              <Button
                                key={index}
                                variant={currentLayout.backgroundStyle.backgroundImage === img ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleBackgroundStyleChange("backgroundImage", img)}
                                className="h-12 p-1"
                              >
                                <img
                                  src={img || "/placeholder.svg"}
                                  alt={`Background ${index + 1}`}
                                  className="w-full h-full object-cover rounded"
                                />
                              </Button>
                            ))
                          })()}
                        </div>
                      </div>

                      {currentLayout.backgroundStyle.backgroundImage && (
                        <>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="overlay"
                              checked={currentLayout.backgroundStyle.overlay}
                              onCheckedChange={(checked) => handleBackgroundStyleChange("overlay", checked)}
                            />
                            <Label htmlFor="overlay">Dark Overlay</Label>
                          </div>

                          {currentLayout.backgroundStyle.overlay && (
                            <div>
                              <Label>Overlay Opacity</Label>
                              <Input
                                type="range"
                                min="0"
                                max="0.8"
                                step="0.1"
                                value={currentLayout.backgroundStyle.overlayOpacity}
                                onChange={(e) =>
                                  handleBackgroundStyleChange("overlayOpacity", Number.parseFloat(e.target.value))
                                }
                                className="mt-2"
                              />
                              <span className="text-sm text-gray-500">
                                {Math.round(currentLayout.backgroundStyle.overlayOpacity * 100)}%
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="layouts" className="space-y-4">
                      <div>
                        <Label>Choose Format</Label>
                        <div className="grid gap-3 mt-2">
                          {templateFormats.map((layout) => (
                            <Button
                              key={layout.id}
                              variant={currentLayout.id === layout.id ? "default" : "outline"}
                              className="h-20 flex flex-col items-center justify-center text-left"
                              onClick={() => handleLayoutChange(layout.id)}
                            >
                              <div className="font-semibold text-sm">{layout.name.split("\n")[0]}</div>
                              <div className="text-xs opacity-75">{layout.name.split("\n")[1]}</div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-sm font-medium">Template Info</Label>
                        <div className="text-xs text-gray-500 mt-2 space-y-1">
                          <p>
                            • Current: {currentLayout.dimensions.width} x {currentLayout.dimensions.height}px
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
