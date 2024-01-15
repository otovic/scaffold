import React, { ComponentType, ElementType, FC, ReactElement } from "react"

export type ScaffoldProps = {
    header?: Element,
    body: React.FC | Element,
    bottomNavBar?: Element
}