package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.CategoriesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Categories.
 */
public interface CategoriesService {

    /**
     * Save a categories.
     *
     * @param categoriesDTO the entity to save
     * @return the persisted entity
     */
    CategoriesDTO save(CategoriesDTO categoriesDTO);

    /**
     * Get all the categories.
     *
     * @return the list of entities
     */
    List<CategoriesDTO> findAll();


    /**
     * Get the "id" categories.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CategoriesDTO> findOne(Long id);

    /**
     * Delete the "id" categories.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
