import { Component, ReactNode } from "react"
import { convertKebabCase } from "../../utils/convertKebabCase"

type ProductAttributesState = {
	attributeItems: { [key: number]: number }
}

type ProductAttributesProps = {
	attributes: GraphQL.AttributeWithSelectedItemType[]

	cart?: boolean

	/**
	 * The user can change the attributes?
	 */
	canChangeAttributes?: boolean
}

export class ProductAttributes extends Component<
	ProductAttributesProps,
	ProductAttributesState
> {
	constructor(props: ProductAttributesProps) {
		super(props)

		const itemsIds: { [key: number]: number } = {}

		this.props.attributes.forEach((attribute) => {
			if (!attribute.items?.length) {
				return
			}

			itemsIds[attribute.id!] = attribute.selected || attribute.items[0].id!
		})

		this.state = {
			attributeItems: itemsIds,
		}
	}

	changeSelectedAttributeItem(attributeId: number, attributeItemId: number) {
		if (this.state.attributeItems[attributeId] == attributeItemId) {
			return
		}
		this.setState((prevState) => ({
			attributeItems: {
				...prevState.attributeItems,
				[attributeId]: attributeItemId,
			},
		}))
	}

	render(): ReactNode {
		const { canChangeAttributes, cart } = this.props

		return (
			<div className={`flex flex-col ${!cart ? "gap-8" : "gap-2"}`}>
				{this.props.attributes?.map((attribute, index) => {
					switch (attribute.type) {
						case "text":
							return (
								<div
									data-testid={
										!cart
											? `product-attribute-${convertKebabCase(attribute.name!)}`
											: `cart-item-attribute-${convertKebabCase(
													attribute.name!
											  )}`
									}
									key={index}
									className={`flex flex-col ${!cart ? "gap-2" : "gap-1"}`}
								>
									<span
										className={`${
											!cart
												? "font-bold text-lg uppercase"
												: "text-sm font-normal capitalize"
										}`}
									>
										{attribute.name}:
									</span>
									<div className="flex flex-row flex-wrap gap-3">
										{attribute.items?.map((attributeItem) => (
											<button
												data-testid={`${
													!cart ? "product" : "cart-item"
												}-attribute-${convertKebabCase(
													attribute.name!
												)}-${convertKebabCase(attributeItem.value!)}${
													this.state.attributeItems[attribute.id!] ==
													attributeItem.id!
														? "-selected"
														: ""
												}`}
												key={attributeItem.id}
												data-tooltip={attributeItem.display_value}
												className={`tooltip font-normal border border-[#1D1F22] uppercase ${
													!cart
														? "text-lg w-[64px] h-[45px]"
														: "text-sm w-fit h-6 px-1"
												} ${
													this.state.attributeItems[attribute.id!] ==
													attributeItem.id!
														? "bg-[#1D1F22] text-white"
														: "bg-white hover:bg-[#c6c6c7] text-[#1D1F22]"
												} ${
													canChangeAttributes === false
														? "cursor-default"
														: "cursor-pointer"
												}`}
												onClick={() => {
													if (canChangeAttributes === false) {
														return
													}
													this.changeSelectedAttributeItem(
														attribute.id!,
														attributeItem.id!
													)
												}}
											>
												{attributeItem.value}
											</button>
										))}
									</div>
								</div>
							)
						case "swatch":
							// always color in this case
							return (
								<div
									key={index}
									className="flex flex-col gap-2"
									data-testid={
										!cart
											? `product-attribute-${convertKebabCase(attribute.name!)}`
											: `cart-item-attribute-${convertKebabCase(
													attribute.name!
											  )}`
									}
								>
									<span className="font-bold text-lg uppercase">
										{attribute.name}:
									</span>
									<div className="flex flex-row flex-wrap gap-2">
										{attribute.items?.map((attributeItem) => (
											<button
												data-testid={`${
													!cart ? "product" : "cart-item"
												}-attribute-${convertKebabCase(
													attribute.name!
												)}-${convertKebabCase(attributeItem.value!)}${
													this.state.attributeItems[attribute.id!] ==
													attributeItem.id!
														? "-selected"
														: ""
												}`}
												key={attributeItem.id}
												data-tooltip={attributeItem.display_value}
												className={`p-[2px] border tooltip ${
													!cart ? "h-9 w-9" : "h-5 w-5"
												} ${
													this.state.attributeItems[attribute.id!] ==
													attributeItem.id!
														? "border-[#5ECE7B] border-[3px]"
														: "border-[#585858]"
												} ${
													canChangeAttributes === false
														? "cursor-default"
														: "cursor-pointer"
												}`}
												onClick={() => {
													if (canChangeAttributes === false) {
														return
													}
													this.changeSelectedAttributeItem(
														attribute.id!,
														attributeItem.id!
													)
												}}
											>
												<span
													className="w-full h-full block"
													style={{ backgroundColor: attributeItem.value }}
												></span>
											</button>
										))}
									</div>
								</div>
							)
						default:
							return <></>
					}
				})}
			</div>
		)
	}
}
