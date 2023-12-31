import AddCartButton from "componentes/AddCartButton";
import AddFavButton from "componentes/AddFavButton";
import Button from "componentes/Button";
import Rating from "componentes/Rating";
import { useFavoriteContext } from "contexts/Favorites";
import { useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const ProductPageModel = ({ product }) => {
    const { favItems } = useFavoriteContext();
    const [quantity, setQuantity] = useState(1);

    const incQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const hasOnFavs = favItems.find((item) => {
        return item.id === product.id;
    });

    const items = product.images.map((img) => {
        return {
            thumbnail: img,
            original: img,
            originalClass:
                "rounded-lg h-[280px] sm:h-[360px] object-cover lg:h-[360px]",
            thumbnailClass: "rounded-3xl max-w-[100px] w-1/3",
        };
    });

    return (
        <>
            <article className="flex flex-col md:flex-row gap-5 mb-9">
                <div className="w-full md:w-2/5 imageGalley-wrapper">
                    <ReactImageGallery
                        items={items}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showNav={false}
                    />
                </div>

                <div className="sm:w-3/5">
                    <h3 className="text-xl text-violeta-01 font-titulos mb-2">
                        {product.name}
                    </h3>
                    <Rating rating={product.rating} />
                    {product.inPromotion[0] ? (
                        <>
                            <p className="line-through text-lg text-rosa-02 font-titulos">
                                R$
                                {product.price.toFixed(2)}
                            </p>
                            <h2
                                className={
                                    "text-3xl text-rosa-01 mb-5 font-titulos"
                                }
                            >
                                R$
                                {(
                                    product.price -
                                    product.price * product.inPromotion[1]
                                ).toFixed(2)}
                            </h2>
                        </>
                    ) : (
                        <h2 className="text-3xl text-rosa-01 mb-4 font-titulos">
                            R$ {product.price.toFixed(2)}
                        </h2>
                    )}
                    <div className="flex items-center gap-2 mb-5">
                        <img src="/img/icons/Shipping_icon.svg" alt="" />
                        <p className="text-cinza-06 font-textos">
                            Calcular frete:
                        </p>
                        <input
                            type="text"
                            className="px-2 py-1 rounded-xl w-[120px] font-textos text-base border-2 border-violeta-01 text-cinza-06"
                            placeholder="Digite o CEP"
                            id="txtShippingCalc"
                            readOnly
                        />
                    </div>
                    <div className="flex items-center gap-16 mb-5">
                        <label
                            htmlFor="txtQuantity"
                            className="text-cinza-06 font-textos"
                        >
                            Quantidade:
                        </label>
                        <span className="flex gap-2 items-center">
                            <Button
                                onclick={decQuantity}
                                classes="btnRemoveQuantity secundary"
                                aria-label="Remover uma unidade do produto"
                            />
                            <input
                                id="txtQuantity"
                                className="w-[20px] text-center appearance-none"
                                type="text"
                                value={quantity}
                                readOnly
                            />
                            <Button
                                onclick={incQuantity}
                                classes="btnAddQuantity secundary"
                                aria-label="Adicionar uma unidade do produto"
                            />
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <AddCartButton product={product} quantity={quantity} />
                        <AddFavButton
                            product={product}                                
                            isFavorite={
                                hasOnFavs
                                    ? "Remover dos favoritos"
                                    : "Adicionar aos favoritos"
                            }
                        />
                    </div>
                </div>
            </article>

            <hr className="border-t-2 border-rosa-01 mb-5" />

            <article>
                <h4 className="text-rosa-01 font-titulos text-xl mb-1">
                    Descrição
                </h4>
                <ReactMarkdown className="font-400 text-lg post-markdown-container font-textos text-cinza-06 ">
                    {product.description}
                </ReactMarkdown>
            </article>
        </>
    );
};

export default ProductPageModel;
