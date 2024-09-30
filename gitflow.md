# Gitflow

## Fluxo de Trabalho no Gitflow

OBS: SEGUIR COMMITS DE ACORDO COM O [SITE](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4)

### Passos

1. **A partir da `develop`**
    - Antes de iniciar qualquer desenvolvimento, certifique-se de que você está na branch `develop`.
    ```sh
    git checkout develop
    ```

2. **Criar uma nova branch**
    - Crie uma nova branch a partir da `develop` para começar a trabalhar em uma nova funcionalidade ou correção. O nome da branch deve refletir o que será desenvolvido.
    ```sh
    git checkout -b nome-da-branch
    ```

3. **Fazer o desenvolvimento**
    - Realize as mudanças necessárias na nova branch criada. Adicione, comite e envie suas alterações para o repositório remoto.
    ```sh
    # Após fazer as alterações nos arquivos
    git add .
    git commit -m "Descrição das alterações realizadas"
    git push origin nome-da-branch
    ```

4. **Merge para `develop`**
    - Depois de concluir o desenvolvimento e testar as alterações, faça o merge da branch criada de volta para a `develop`. Primeiro, vá para a branch `develop`.
    ```sh
    git checkout develop
    ```

    - Então, faça o merge da sua branch.
    ```sh
    git merge nome-da-branch
    ```

    - Finalmente, envie as alterações para o repositório remoto.
    ```sh
    git push origin develop
    ```

## Exemplo Prático

```sh
# Step 1: Checkout to develop branch
git checkout develop

# Step 2: Create a new branch
git checkout -b feature/nova-funcionalidade

# Step 3: Make changes, then add, commit, and push
# (Assuming changes are made)
git add .
git commit -m "Adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade

# Step 4: Merge back to develop
git checkout develop
git merge feature/nova-funcionalidade
git push origin develop