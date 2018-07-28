package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.CategoriesService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.CategoriesDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Categories.
 */
@RestController
@RequestMapping("/api")
public class CategoriesResource {

    private final Logger log = LoggerFactory.getLogger(CategoriesResource.class);

    private static final String ENTITY_NAME = "categories";

    private final CategoriesService categoriesService;

    public CategoriesResource(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }

    /**
     * POST  /categories : Create a new categories.
     *
     * @param categoriesDTO the categoriesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoriesDTO, or with status 400 (Bad Request) if the categories has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categories")
    @Timed
    public ResponseEntity<CategoriesDTO> createCategories(@RequestBody CategoriesDTO categoriesDTO) throws URISyntaxException {
        log.debug("REST request to save Categories : {}", categoriesDTO);
        if (categoriesDTO.getId() != null) {
            throw new BadRequestAlertException("A new categories cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoriesDTO result = categoriesService.save(categoriesDTO);
        return ResponseEntity.created(new URI("/api/categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categories : Updates an existing categories.
     *
     * @param categoriesDTO the categoriesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoriesDTO,
     * or with status 400 (Bad Request) if the categoriesDTO is not valid,
     * or with status 500 (Internal Server Error) if the categoriesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categories")
    @Timed
    public ResponseEntity<CategoriesDTO> updateCategories(@RequestBody CategoriesDTO categoriesDTO) throws URISyntaxException {
        log.debug("REST request to update Categories : {}", categoriesDTO);
        if (categoriesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoriesDTO result = categoriesService.save(categoriesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoriesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categories : get all the categories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categories in body
     */
    @GetMapping("/categories")
    @Timed
    public List<CategoriesDTO> getAllCategories() {
        log.debug("REST request to get all Categories");
        return categoriesService.findAll();
    }

    /**
     * GET  /categories/:id : get the "id" categories.
     *
     * @param id the id of the categoriesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoriesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/categories/{id}")
    @Timed
    public ResponseEntity<CategoriesDTO> getCategories(@PathVariable Long id) {
        log.debug("REST request to get Categories : {}", id);
        Optional<CategoriesDTO> categoriesDTO = categoriesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(categoriesDTO);
    }

    /**
     * DELETE  /categories/:id : delete the "id" categories.
     *
     * @param id the id of the categoriesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategories(@PathVariable Long id) {
        log.debug("REST request to delete Categories : {}", id);
        categoriesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
