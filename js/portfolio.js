const projectGrid = document.querySelector("#project-grid");
const albumList = document.querySelector("#album-list");

function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
}

function createDataMessage(text) {
    const message = createTextElement("p", "data-message", text);
    message.setAttribute("role", "status");
    return message;
}

function createProjectCard(project, isFeatured) {
    const hasLink = project.hasLink && project.linkUrl;
    const card = document.createElement(hasLink ? "a" : "article");
    card.className = `project-card${isFeatured ? " project-card--featured" : ""}`;

    if (hasLink) {
        card.href = project.linkUrl;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
    }

    const category = project.category.toLocaleUpperCase("pt-BR");
    card.append(createTextElement("span", "project-number", `${project.displayOrder} / ${category}`));

    const icon = createTextElement(
        "span",
        `project-icon${isFeatured ? "" : " project-icon--outline"}`,
        project.icon
    );
    icon.setAttribute("aria-hidden", "true");
    card.append(icon);
    card.append(createTextElement("h3", "", project.name));
    card.append(createTextElement("p", "", project.description));

    if (project.isApplication) {
        card.append(createTextElement("span", "project-type", "Aplicação"));
    }

    const cardLink = document.createElement("span");
    cardLink.className = "card-link";
    cardLink.append(document.createTextNode(hasLink ? project.linkLabel : "Em breve"));
    if (hasLink) {
        const arrow = createTextElement("span", "", "↗");
        arrow.setAttribute("aria-hidden", "true");
        cardLink.append(arrow);
    }
    card.append(cardLink);

    return card;
}

function createAlbum(project) {
    const gallery = project.gallery;
    const photos = [...gallery.photos].sort((first, second) => first.order - second.order);

    if (!gallery.folder || (photos.length === 0 && !gallery.showWhenEmpty)) {
        return null;
    }

    const slug = project.id.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    const album = document.createElement("section");
    album.className = `album ${photos.length > 3 ? "album--story" : "album--compact"}`;
    album.id = `album-${slug}`;
    album.setAttribute("aria-labelledby", `title-${slug}`);

    const heading = document.createElement("div");
    heading.className = "album-heading";

    const titleGroup = document.createElement("div");
    titleGroup.append(createTextElement("p", "eyebrow", gallery.sectionLabel || project.category));
    const title = createTextElement("h3", "", project.name);
    title.id = `title-${slug}`;
    titleGroup.append(title);
    heading.append(titleGroup);

    const count = document.createElement("span");
    count.className = "album-count";
    if (photos.length === 0) {
        count.textContent = "Em breve";
    } else {
        const photoLabel = photos.length === 1 ? "foto" : "fotos";
        const layoutLabel = photos.length > 3 ? "álbum" : "destaque";
        count.append(document.createTextNode(`${photos.length} ${photoLabel} `));
        const separator = createTextElement("span", "", "·");
        separator.setAttribute("aria-hidden", "true");
        count.append(separator, document.createTextNode(` ${layoutLabel}`));
    }
    heading.append(count);
    album.append(heading);
    album.append(createTextElement("p", "album-description", project.description));

    if (project.hasLink && project.linkUrl) {
        const link = document.createElement("a");
        link.className = "album-link";
        link.href = project.linkUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.append(document.createTextNode(project.linkLabel));
        const arrow = createTextElement("span", "", "↗");
        arrow.setAttribute("aria-hidden", "true");
        link.append(arrow);
        album.append(link);
    }

    if (photos.length === 0) {
        album.append(createTextElement("p", "album-empty", "As fotos deste projeto serão adicionadas aqui."));
        return album;
    }

    const photoGrid = document.createElement("div");
    photoGrid.className = "album-photos";

    for (const photo of photos) {
        const figure = document.createElement("figure");
        figure.className = "album-photo";

        const image = document.createElement("img");
        image.src = `img/galeria/${encodeURIComponent(gallery.folder)}/${encodeURIComponent(photo.file)}`;
        image.alt = photo.alt || project.name;
        image.loading = "lazy";
        image.decoding = "async";
        figure.append(image);

        const caption = document.createElement("figcaption");
        caption.append(createTextElement("span", "", `FOTO ${photo.order}`));
        figure.append(caption);
        photoGrid.append(figure);
    }

    album.append(photoGrid);
    return album;
}

async function loadProjects() {
    const response = await fetch("data/projetos.json");
    if (!response.ok) {
        throw new Error(`Falha ao carregar o catálogo (${response.status}).`);
    }

    const catalog = await response.json();
    if (!Array.isArray(catalog.projects)) {
        throw new Error("O catálogo precisa conter uma lista 'projects'.");
    }

    const projects = [...catalog.projects].sort(
        (first, second) => first.displayOrder - second.displayOrder
    );
    const highlightedProjects = projects.filter((project) => project.showInHighlights);

    projectGrid.replaceChildren(
        ...highlightedProjects.map((project, index) => createProjectCard(project, index === 0))
    );
    albumList.replaceChildren(...projects.map(createAlbum).filter(Boolean));
    projectGrid.setAttribute("aria-busy", "false");
    albumList.setAttribute("aria-busy", "false");
}

loadProjects().catch((error) => {
    console.error("Não foi possível renderizar os projetos do JSON.", error);
    const help = window.location.protocol === "file:"
        ? " Abra o site por um servidor local, como a extensão Live Server do VS Code."
        : " Confira se data/projetos.json está disponível e tente recarregar a página.";
    const message = `Não foi possível carregar os projetos.${help}`;

    projectGrid.replaceChildren(createDataMessage(message));
    albumList.replaceChildren(createDataMessage(message));
    projectGrid.setAttribute("aria-busy", "false");
    albumList.setAttribute("aria-busy", "false");
});
