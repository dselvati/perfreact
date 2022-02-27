import { memo, useState } from 'react'
import { AddProductToWishlistProps } from './AddProductToWishlist'
import dynamic from 'next/dynamic' // Dynamic somente para o SSR, se não utilizar o lazy do react
import lodash from 'lodash'
// import { AddProductToWishList } from './AddProductToWishlist'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number
    price: number
    priceFormatted: string
    title: string
  },
  onAddToWishlist: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {

  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  // async function showFormattedDate() {
  //   const { format } = await import('date-fns')

  //   format()
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      {/* <button onClick={() => onAddToWishlist(product.id)}>Ad to wishlist</button> */}
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      {
        isAddingToWishlist &&
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // condição que satifaz para dizer que esse componente é igual ao anterior

  // return Object.is(prevProps.product, nextProps.product) // Tomar cuidado, consome muito processamento

  return lodash.isEqual(prevProps.product, nextProps.product)
})