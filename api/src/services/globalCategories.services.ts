import {TransactionType, type Category} from "@prisma/client";
import prisma from "../config/prisma.ts";

type GlobalCategoryInput = Pick<Category, "name" | "color" | "type">

const globalCategories: GlobalCategoryInput[] = [
  // 💸 Despesas
  { name: "Alimentação", color: "#FF6B6B", type: TransactionType.expense }, // vermelho suave
  { name: "Transporte", color: "#4ECDC4", type: TransactionType.expense }, // turquesa
  { name: "Moradia", color: "#45B7D1", type: TransactionType.expense }, // azul claro
  { name: "Saúde", color: "#C56CF0", type: TransactionType.expense }, // lilás
  { name: "Educação", color: "#F78FB3", type: TransactionType.expense }, // rosa pastel
  { name: "Lazer", color: "#FFD93D", type: TransactionType.expense }, // amarelo
  { name: "Supermercado", color: "#00C9A7", type: TransactionType.expense }, // verde água
  { name: "Vestuário", color: "#FF9F1C", type: TransactionType.expense }, // laranja queimado
  { name: "Higiene", color: "#9B5DE5", type: TransactionType.expense }, // roxo médio
  { name: "Presente", color: "#FFB6B9", type: TransactionType.expense }, // rosa claro
  { name: "Assinaturas", color: "#6BCB77", type: TransactionType.expense }, // verde médio
  { name: "Investimento", color: "#4D96FF", type: TransactionType.expense }, // azul forte
  { name: "Outros", color: "#A5A6F6", type: TransactionType.expense }, // lavanda clara

  // 💰 Receitas
  { name: "Salário", color: "#1DD3B0", type: TransactionType.income }, // verde turquesa
  { name: "Freelance", color: "#00BFA6", type: TransactionType.income }, // verde escuro
  { name: "Investimentos", color: "#FFD93D", type: TransactionType.income }, // amarelo ouro
  { name: "Bônus", color: "#FF6F91", type: TransactionType.income }, // rosa vibrante
  { name: "Reembolso", color: "#6BCB77", type: TransactionType.income }, // verde médio
  { name: "Presente", color: "#4D96FF", type: TransactionType.income }, // azul forte
  { name: "Outros", color: "#A5A6F6", type: TransactionType.income }, // lilás claro
];

export const initializeGlobalCatgories = async():Promise<Category[]>=>{
    const createdCategories:Category[] = []

    for (const category of globalCategories){
        try{
            const existing = await prisma.category.findFirst({
                where:{
                    name: category.name,
                    type: category.type
                }
            })

            if(!existing){
                const newCategory = await prisma.category.create({data: category})
                console.log(`Criada ${newCategory.name}`)
                createdCategories.push(newCategory)
            }else{
                createdCategories.push(existing)
            }

        }catch(err){
            console.error("Erro ao criar categorias")
        }
        console.log("Todas as categorias inicializadas")
    }

    return createdCategories;
}